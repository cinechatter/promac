// ── Material Estimator: calculation engine ──────────────────────
// All figures are rule-of-thumb construction estimates for a preliminary
// quote, not a substitute for a licensed engineer/electrician's takeoff.

export const ROOM_TYPES = [
  "Kitchen",
  "Bathroom",
  "Bedroom",
  "Living Room",
  "Basement",
  "Home Theater / Media Room",
  "Garage",
  "Laundry Room",
  "Office",
  "Outdoor / Patio",
  "Sunroom / Room Addition",
  "Other",
];

export const ADDITION_ROOM_TYPE = "Sunroom / Room Addition";

export const FOUNDATION_TYPES = [
  { value: "slab", label: "New Slab-on-Grade" },
  { value: "crawlspace", label: "New Crawl Space" },
  { value: "pier", label: "New Pier/Post Foundation" },
  { value: "existingDeck", label: "Building Over Existing Deck/Patio" },
];

export const ROOF_TYPES = [
  { value: "shed", label: "Shed Roof (single slope)" },
  { value: "gable", label: "Gable Roof (two slopes)" },
  { value: "flat", label: "Flat / Low-Slope Roof" },
];

const CEILING_HEIGHT = 8; // ft, standard assumption when not specified
const DOOR_AREA_DEDUCTION = 21; // sqft, one standard 3'x7' door opening per room
const DRYWALL_SHEET_SQFT = 32; // 4x8 sheet
const PAINT_COVERAGE_PER_GALLON = 350; // sqft per coat
const PAINT_COATS = 2;
const SQFT_PER_TON_AC = 500; // rule of thumb: 400-600 sqft per ton, use midpoint
const ROOF_AREA_FACTOR = { shed: 1.05, gable: 1.15, flat: 1.02 }; // overhang + pitch allowance
const WINDOW_SQFT = 12; // typical 3'x4' window, for glazing/heat-load estimate

// Fastener / trim / wiring rules of thumb
const DRYWALL_SCREWS_PER_SHEET = 32; // ~1 screw/sqft at 7"/12" o.c. spacing
const SCREWS_PER_BOX = 190; // typical 1lb box of drywall screws
const DOOR_TRIM_FT = 17; // casing linear ft per standard interior door (2 legs + head)
const WINDOW_TRIM_FT = 14; // casing linear ft per window
const CAULK_COVERAGE_FT = 30; // linear ft of joint per tube
const ADHESIVE_PER_SHEETS = 6; // 1 tube of construction adhesive per N drywall sheets
const ADHESIVE_PER_TRIM_FT = 25; // 1 tube of adhesive per N ft of baseboard/trim
const WIRE_DEVICE_RUN_FT = 15; // avg device-to-device wire run
const WIRE_HOME_RUN_FT = 25; // avg breaker-to-first-device run
const WIRE_STAPLE_SPACING_FT = 3; // cable staple every N ft along framing
const DEVICES_PER_CIRCUIT = 6; // ~6 general-purpose devices per 15A/20A circuit

// Home Depot has no public product-lookup API, so we can't reliably link a
// specific SKU/price (it would go stale or be wrong). Instead we link to a
// live Home Depot search results page for the material — always current.
function hdSearch(query) {
  return `https://www.homedepot.com/s/${encodeURIComponent(query)}`;
}

function hdLink(label, query) {
  return { label, url: hdSearch(query) };
}

export function makeEmptyRoom(id) {
  return {
    id,
    name: "",
    type: "Bedroom",
    area: "",
    doorType: "regular", // regular | hidden
    doorStyle: "regular", // regular | arc
    paintColor: "",
    appliances: { fridge: false, microwave: false, dishwasher: false, oven: false, washerDryer: false },
    lighting: { canLights: 0, chandeliers: 0, regularFixtures: 0 },
    needsPlumbing: false, // manually flagged for non-standard rooms (e.g. wet bar)
    insulation: "regular", // regular | soundproof
    addition: {
      foundationType: "slab",
      roofType: "gable",
      windowCount: 0,
      wallFraming: "2x6", // 2x4 | 2x6
    },
  };
}

function estimatePerimeter(areaSqft) {
  const side = Math.sqrt(areaSqft);
  return 4 * side;
}

function roomHasPlumbing(room) {
  return ["Kitchen", "Bathroom", "Laundry Room"].includes(room.type) || room.needsPlumbing;
}

function roomIsWetArea(room) {
  return room.type === "Kitchen" || room.type === "Bathroom" || room.type === "Laundry Room";
}

function roomIsAddition(room) {
  return room.type === ADDITION_ROOM_TYPE;
}

export function estimateRoom(room) {
  const area = Number(room.area) || 0;
  const perimeter = estimatePerimeter(area);
  const wallArea = Math.max(perimeter * CEILING_HEIGHT - DOOR_AREA_DEDUCTION, 0);
  const ceilingArea = area;

  // Drywall
  const totalDrywallArea = wallArea + ceilingArea;
  const drywallSheets = Math.ceil((totalDrywallArea * 1.1) / DRYWALL_SHEET_SQFT);

  // Paint
  const paintGallons = Math.ceil((wallArea * PAINT_COATS) / PAINT_COVERAGE_PER_GALLON);

  // Flooring
  const flooringSqft = Math.ceil(area * 1.1);

  // Doors
  const doorNotes = [];
  if (room.doorType === "hidden") doorNotes.push("Hidden/invisible door — frameless slab, continuous piano hinge, magnetic catch, flush jamb trim (custom hardware).");
  if (room.doorStyle === "arc") doorNotes.push("Arched top door — custom arched jamb & header framing required.");

  // Electrical: general purpose outlets (NEC-style spacing ~12 ft apart, no point >6ft from an outlet)
  const generalOutlets = Math.max(Math.ceil(perimeter / 12), area > 0 ? 1 : 0);
  const isWetArea = roomIsWetArea(room);
  const generalOutletAmp = isWetArea ? 20 : 15; // kitchen/bath/laundry code-minimum 20A small-appliance/GFCI circuits

  // Kitchen counter GFCI outlets (approx counter length = 30% of perimeter)
  let counterOutlets = 0;
  if (room.type === "Kitchen") {
    const counterLength = perimeter * 0.3;
    counterOutlets = Math.max(Math.ceil(counterLength / 4), 2); // min 2 small-appliance circuits by code
  }

  // Dedicated appliance circuits
  const dedicatedCircuits = [];
  if (room.appliances.fridge) dedicatedCircuits.push({ label: "Refrigerator", amp: 20, volt: 120 });
  if (room.appliances.microwave) dedicatedCircuits.push({ label: "Built-in Microwave", amp: 20, volt: 120 });
  if (room.appliances.dishwasher) dedicatedCircuits.push({ label: "Dishwasher", amp: 15, volt: 120 });
  if (room.appliances.oven) dedicatedCircuits.push({ label: "Range/Oven", amp: 50, volt: 240 });
  if (room.appliances.washerDryer) {
    dedicatedCircuits.push({ label: "Washer", amp: 20, volt: 120 });
    dedicatedCircuits.push({ label: "Electric Dryer", amp: 30, volt: 240 });
  }

  // Lighting
  const { canLights, chandeliers, regularFixtures } = room.lighting;
  const lightingCircuitsNeeded = Math.ceil((Number(canLights) + Number(regularFixtures)) / 10) + (Number(chandeliers) > 0 ? Math.ceil(Number(chandeliers) / 3) : 0);
  const lightingNotes = [];
  if (Number(chandeliers) > 0) lightingNotes.push(`${chandeliers} chandelier/heavy-fixture outlet box(es) — use fan/fixture-rated retrofit boxes.`);

  const totalNewCircuits =
    Math.ceil(generalOutlets / 6) + // ~6 general outlets per 15A circuit
    (counterOutlets > 0 ? Math.ceil(counterOutlets / 4) : 0) +
    dedicatedCircuits.length +
    Math.max(lightingCircuitsNeeded, area > 0 ? 1 : 0);

  // AC tonnage — add 10% capacity for media/home theater heat load from AV gear
  let acTons = area > 0 ? Math.ceil((area / SQFT_PER_TON_AC) * 2) / 2 : 0; // round to nearest 0.5
  if (room.type === "Home Theater / Media Room") acTons = Math.ceil(acTons * 1.1 * 2) / 2;
  const isAddition = roomIsAddition(room);
  if (isAddition) {
    // Glass-heavy additions (sunrooms) lose/gain heat faster — add ~2% capacity per window
    const windowCount = Number(room.addition?.windowCount) || 0;
    acTons = Math.ceil(acTons * (1 + windowCount * 0.02) * 2) / 2;
  }
  acTons = Math.max(acTons, area > 0 ? 0.5 : 0);

  // Plumbing fixtures
  const plumbingFixtures = [];
  if (roomHasPlumbing(room)) {
    if (room.type === "Kitchen") {
      plumbingFixtures.push("Kitchen sink supply/drain/vent");
      if (room.appliances.dishwasher) plumbingFixtures.push("Dishwasher supply/drain line");
      if (room.appliances.fridge) plumbingFixtures.push("Fridge ice-maker water line (if applicable)");
    } else if (room.type === "Bathroom") {
      plumbingFixtures.push("Toilet rough-in");
      plumbingFixtures.push(area > 70 ? "Double vanity sink rough-in" : "Vanity sink rough-in");
      plumbingFixtures.push("Shower/tub supply, drain & vent");
    } else if (room.type === "Laundry Room") {
      plumbingFixtures.push("Washer supply & standpipe drain");
    } else {
      plumbingFixtures.push("Wet bar / auxiliary sink supply & drain (verify fixture count with client)");
    }
  }

  // Insulation
  let insulationType = room.insulation === "soundproof" ? "Acoustic/soundproof (mineral wool + resilient channel, Green Glue)" : "Standard fiberglass batt (R-13 walls)";
  const insulationSqft = room.insulation === "soundproof" ? Math.ceil(wallArea + ceilingArea) : Math.ceil(wallArea);

  // New exterior room addition — foundation, roof, siding, windows, tie-in
  let addition = null;
  if (isAddition) {
    const { foundationType, roofType, windowCount, wallFraming } = room.addition || {};
    const windows = Number(windowCount) || 0;

    if (wallFraming === "2x6") insulationType = "Exterior-grade fiberglass/mineral wool batt (R-21, 2x6 wall)";
    else insulationType = "Exterior-grade fiberglass batt (R-13, 2x4 wall)";

    let foundationNote;
    let concreteSqft = 0;
    let footingLinearFt = 0;
    let piers = 0;
    if (foundationType === "slab") {
      concreteSqft = Math.ceil(area);
      footingLinearFt = Math.round(perimeter);
      foundationNote = "New slab-on-grade: concrete slab pour + perimeter footing.";
    } else if (foundationType === "crawlspace") {
      footingLinearFt = Math.round(perimeter);
      foundationNote = "New crawl space: perimeter footing/foundation wall + floor framing over crawl space.";
    } else if (foundationType === "pier") {
      piers = Math.max(Math.ceil(perimeter / 6), 4);
      foundationNote = `New pier/post foundation: ~${piers} piers (spaced ~6 ft apart) + floor framing.`;
    } else {
      foundationNote = "Building over existing deck/patio: verify existing structure can bear roof/wall loads — may still need supplemental footings for new roof support posts.";
    }

    const roofFactor = ROOF_AREA_FACTOR[roofType] || ROOF_AREA_FACTOR.gable;
    const roofArea = Math.ceil(area * roofFactor);
    const roofSquares = Math.ceil(roofArea / 100); // roofing "square" = 100 sqft
    const rafterLinearFt = Math.round(perimeter); // simplified: one rafter/truss run per linear ft of perimeter

    const sidingSqft = Math.round(wallArea);
    const glazingSqft = windows * WINDOW_SQFT;

    // Roof-to-house tie-in: flashing along the wall shared with the existing house (~1 side)
    const tieInFlashingFt = Math.round(perimeter / 4);

    addition = {
      foundationType,
      foundationNote,
      concreteSqft,
      footingLinearFt,
      piers,
      roofType,
      roofSquares,
      rafterLinearFt,
      wallFraming,
      sidingSqft,
      windowCount: windows,
      glazingSqft,
      tieInFlashingFt,
      permitNote: "New exterior additions typically require a building permit and may require a structural engineer's stamp for roof load transfer and the foundation design — confirm with the local jurisdiction before starting.",
    };
  }

  // Drywall fasteners
  const drywallScrews = drywallSheets * DRYWALL_SCREWS_PER_SHEET;
  const drywallScrewBoxes = Math.ceil(drywallScrews / SCREWS_PER_BOX);

  // Trim & baseboard (perimeter minus ~1 door width, +10% waste)
  const baseboardLinearFt = Math.ceil(Math.max(perimeter - 3, 0) * 1.1);
  const doorTrimLinearFt = area > 0 ? DOOR_TRIM_FT : 0;
  const windowTrimLinearFt = addition ? addition.windowCount * WINDOW_TRIM_FT : 0;
  const casingLinearFt = doorTrimLinearFt + windowTrimLinearFt; // door + window casing only, excludes baseboard
  const trimLinearFt = baseboardLinearFt + casingLinearFt; // combined, used for caulk coverage

  // Caulk & construction adhesive
  const caulkTubes = area > 0 ? Math.ceil(trimLinearFt / CAULK_COVERAGE_FT) : 0;
  const adhesiveTubes = area > 0 ? Math.ceil(drywallSheets / ADHESIVE_PER_SHEETS) + Math.ceil(baseboardLinearFt / ADHESIVE_PER_TRIM_FT) : 0;

  // Vapor barrier (below-grade/basement) and exterior weather barrier (new additions, same sqft as siding)
  const vaporBarrierSqft = room.type === "Basement" ? Math.ceil(wallArea) : 0;
  const houseWrapSqft = addition ? addition.sidingSqft : 0;

  // Switches & device cover plates
  const numLightFixtures = Number(canLights) + Number(chandeliers) + Number(regularFixtures);
  const switchCount = (Number(canLights) > 0 ? 1 : 0) + (Number(chandeliers) > 0 ? 1 : 0) + (Number(regularFixtures) > 0 ? 1 : 0);
  const switchPlates = switchCount;
  const outletPlates = generalOutlets + counterOutlets + dedicatedCircuits.length;

  // Romex wire runs, split by gauge/amp rating
  const dedicated120 = dedicatedCircuits.filter((c) => c.volt === 120);
  const dedicated240 = dedicatedCircuits.filter((c) => c.volt === 240);

  const circuits15A = generalOutletAmp === 15 ? Math.ceil(generalOutlets / DEVICES_PER_CIRCUIT) : 0;
  let wire14_2Ft = generalOutletAmp === 15 ? generalOutlets * WIRE_DEVICE_RUN_FT + circuits15A * WIRE_HOME_RUN_FT : 0;

  const circuits20A = generalOutletAmp === 20 ? Math.ceil((generalOutlets + counterOutlets) / DEVICES_PER_CIRCUIT) : counterOutlets > 0 ? Math.ceil(counterOutlets / DEVICES_PER_CIRCUIT) : 0;
  let wire12_2Ft = (generalOutletAmp === 20 ? generalOutlets * WIRE_DEVICE_RUN_FT : 0) + counterOutlets * WIRE_DEVICE_RUN_FT + circuits20A * WIRE_HOME_RUN_FT;

  dedicated120.forEach((c) => {
    const runFt = WIRE_HOME_RUN_FT + 5;
    if (c.amp === 15) wire14_2Ft += runFt;
    else wire12_2Ft += runFt;
  });

  // Lighting: fixtures daisy-chained back to a switch, switch back to the panel (assume 15A/14-2)
  if (numLightFixtures > 0) {
    wire14_2Ft += numLightFixtures * WIRE_DEVICE_RUN_FT + Math.max(switchCount, 1) * WIRE_HOME_RUN_FT;
  }

  const wire240Ft = dedicated240.length * (WIRE_HOME_RUN_FT + 10); // heavier gauge (6/3 or 10/3), single home run each

  wire14_2Ft = Math.ceil(wire14_2Ft);
  wire12_2Ft = Math.ceil(wire12_2Ft);
  const wireStaples = Math.ceil((wire14_2Ft + wire12_2Ft + wire240Ft) / WIRE_STAPLE_SPACING_FT);

  // Home Depot shopping links (live search results, not pinned SKUs)
  const shopLinks = [];
  shopLinks.push(hdLink("Drywall Sheets (4x8)", "4x8 drywall sheet"));
  shopLinks.push(hdLink("Interior Paint", room.paintColor ? `interior paint ${room.paintColor}` : "interior paint gallon"));

  const flooringQuery =
    room.type === "Kitchen" || room.type === "Bathroom" || room.type === "Laundry Room"
      ? "tile flooring"
      : room.type === "Basement" || isAddition
      ? "vinyl plank flooring"
      : "laminate flooring";
  shopLinks.push(hdLink("Flooring", flooringQuery));

  if (acTons > 0) shopLinks.push(hdLink(`${acTons} Ton Central AC Unit`, `${acTons} ton central air conditioner`));

  shopLinks.push(hdLink(`${generalOutletAmp}A Outlets`, `${generalOutletAmp} amp ${isWetArea ? "GFCI " : ""}outlet`));
  if (counterOutlets > 0) shopLinks.push(hdLink("Counter GFCI Outlets", "20 amp GFCI outlet"));

  dedicatedCircuits.forEach((c) => {
    shopLinks.push(hdLink(`${c.label} Breaker (${c.amp}A/${c.volt}V)`, `${c.amp} amp ${c.volt}V breaker`));
  });

  if (Number(canLights) > 0) shopLinks.push(hdLink("Can Lights", "LED recessed can light"));
  if (Number(chandeliers) > 0) shopLinks.push(hdLink("Fixture-Rated Retrofit Box", "ceiling fan rated electrical box"));
  if (Number(regularFixtures) > 0) shopLinks.push(hdLink("Light Fixtures", "flush mount ceiling light fixture"));

  const doorQuery = room.doorType === "hidden" ? "flush slab interior door" : room.doorStyle === "arc" ? "arched interior door" : "6 panel interior door";
  shopLinks.push(hdLink("Door", doorQuery));

  plumbingFixtures.forEach((f) => {
    let q = "plumbing rough-in fixture";
    if (/toilet/i.test(f)) q = "toilet";
    else if (/vanity/i.test(f)) q = "bathroom vanity with sink";
    else if (/shower|tub/i.test(f)) q = "shower tub kit";
    else if (/kitchen sink/i.test(f)) q = "kitchen sink";
    else if (/dishwasher/i.test(f)) q = "dishwasher supply line kit";
    else if (/ice.?maker/i.test(f)) q = "ice maker water line kit";
    else if (/washer/i.test(f)) q = "washer standpipe drain kit";
    else if (/wet bar/i.test(f)) q = "bar sink";
    shopLinks.push(hdLink(f, q));
  });

  shopLinks.push(hdLink("Insulation", room.insulation === "soundproof" ? "mineral wool soundproof insulation" : insulationType.includes("R-21") ? "R-21 fiberglass insulation batt" : "R-13 fiberglass insulation batt"));

  shopLinks.push(hdLink("Drywall Screws", "drywall screws"));
  shopLinks.push(hdLink("Baseboard", "baseboard molding"));
  shopLinks.push(hdLink("Door/Window Trim", "interior door casing trim"));
  shopLinks.push(hdLink("Caulk", "paintable caulk"));
  shopLinks.push(hdLink("Construction Adhesive", "construction adhesive"));
  if (vaporBarrierSqft > 0) shopLinks.push(hdLink("Vapor Barrier", "6 mil vapor barrier plastic sheeting"));
  if (houseWrapSqft > 0) shopLinks.push(hdLink("House Wrap / Weather Barrier", "house wrap weather barrier"));
  if (wire14_2Ft > 0) shopLinks.push(hdLink("14/2 NM-B Wire (15A)", "14/2 romex wire"));
  if (wire12_2Ft > 0) shopLinks.push(hdLink("12/2 NM-B Wire (20A)", "12/2 romex wire"));
  if (wire240Ft > 0) shopLinks.push(hdLink("240V Appliance Wire", "10/3 romex wire"));
  if (wireStaples > 0) shopLinks.push(hdLink("Cable Staples", "wire cable staples"));
  if (switchCount > 0) shopLinks.push(hdLink("Light Switches", "light switch"));
  if (switchPlates > 0) shopLinks.push(hdLink("Switch Plates", "switch wall plate"));
  if (outletPlates > 0) shopLinks.push(hdLink("Outlet Plates", "outlet wall plate"));

  if (addition) {
    if (addition.concreteSqft > 0) shopLinks.push(hdLink("Concrete Mix (Slab)", "concrete mix bag"));
    if (addition.piers > 0) shopLinks.push(hdLink("Deck/Pier Blocks", "concrete deck pier block"));
    if (addition.footingLinearFt > 0 && addition.concreteSqft === 0) shopLinks.push(hdLink("Footing Form", "concrete footing form"));
    shopLinks.push(hdLink("Roofing Shingles", "architectural roof shingles"));
    shopLinks.push(hdLink("Siding", "vinyl siding panel"));
    if (addition.windowCount > 0) shopLinks.push(hdLink("Windows", "vinyl replacement window"));
    shopLinks.push(hdLink("Roof Flashing", "roof flashing"));
  }

  return {
    id: room.id,
    name: room.name || room.type,
    type: room.type,
    area,
    perimeter: Math.round(perimeter),
    wallArea: Math.round(wallArea),
    drywallSheets,
    paintGallons,
    paintColor: room.paintColor,
    flooringSqft,
    doorNotes,
    doorType: room.doorType,
    doorStyle: room.doorStyle,
    generalOutlets,
    generalOutletAmp,
    counterOutlets,
    dedicatedCircuits,
    lighting: room.lighting,
    lightingNotes,
    totalNewCircuits,
    acTons,
    plumbingFixtures,
    insulationType,
    insulationSqft,
    isAddition,
    addition,
    shopLinks,
    drywallScrews,
    drywallScrewBoxes,
    baseboardLinearFt,
    doorTrimLinearFt,
    windowTrimLinearFt,
    casingLinearFt,
    trimLinearFt,
    caulkTubes,
    adhesiveTubes,
    vaporBarrierSqft,
    houseWrapSqft,
    switchCount,
    switchPlates,
    outletPlates,
    wire14_2Ft,
    wire12_2Ft,
    wire240Ft,
    wireStaples,
  };
}

export function estimateProject(rooms, totalArea) {
  const roomEstimates = rooms.filter((r) => Number(r.area) > 0).map(estimateRoom);

  const totals = roomEstimates.reduce(
    (acc, r) => {
      acc.drywallSheets += r.drywallSheets;
      acc.paintGallons += r.paintGallons;
      acc.flooringSqft += r.flooringSqft;
      acc.generalOutlets15A += r.generalOutletAmp === 15 ? r.generalOutlets : 0;
      acc.generalOutlets20A += r.generalOutletAmp === 20 ? r.generalOutlets : 0;
      acc.counterOutlets20A += r.counterOutlets;
      acc.dedicatedCircuits += r.dedicatedCircuits.length;
      acc.newCircuits += r.totalNewCircuits;
      acc.acTons += r.acTons;
      acc.insulationSqft += r.insulationSqft;
      acc.drywallScrewBoxes += r.drywallScrewBoxes;
      acc.baseboardLinearFt += r.baseboardLinearFt;
      acc.casingLinearFt += r.casingLinearFt;
      acc.trimLinearFt += r.trimLinearFt;
      acc.caulkTubes += r.caulkTubes;
      acc.adhesiveTubes += r.adhesiveTubes;
      acc.vaporBarrierSqft += r.vaporBarrierSqft;
      acc.houseWrapSqft += r.houseWrapSqft;
      acc.switchCount += r.switchCount;
      acc.outletPlates += r.outletPlates;
      acc.wire14_2Ft += r.wire14_2Ft;
      acc.wire12_2Ft += r.wire12_2Ft;
      acc.wire240Ft += r.wire240Ft;
      acc.wireStaples += r.wireStaples;
      if (r.addition) {
        acc.concreteSqft += r.addition.concreteSqft;
        acc.footingLinearFt += r.addition.footingLinearFt;
        acc.piers += r.addition.piers;
        acc.roofSquares += r.addition.roofSquares;
        acc.sidingSqft += r.addition.sidingSqft;
        acc.windowCount += r.addition.windowCount;
      }
      return acc;
    },
    {
      drywallSheets: 0,
      paintGallons: 0,
      flooringSqft: 0,
      generalOutlets15A: 0,
      generalOutlets20A: 0,
      counterOutlets20A: 0,
      dedicatedCircuits: 0,
      newCircuits: 0,
      acTons: 0,
      insulationSqft: 0,
      drywallScrewBoxes: 0,
      baseboardLinearFt: 0,
      casingLinearFt: 0,
      trimLinearFt: 0,
      caulkTubes: 0,
      adhesiveTubes: 0,
      vaporBarrierSqft: 0,
      houseWrapSqft: 0,
      switchCount: 0,
      outletPlates: 0,
      wire14_2Ft: 0,
      wire12_2Ft: 0,
      wire240Ft: 0,
      wireStaples: 0,
      concreteSqft: 0,
      footingLinearFt: 0,
      piers: 0,
      roofSquares: 0,
      sidingSqft: 0,
      windowCount: 0,
    }
  );

  let panelRecommendation;
  if (totals.newCircuits <= 4) {
    panelRecommendation = "Likely fine extending the existing panel — verify open breaker slots and available capacity.";
  } else if (totals.newCircuits <= 10) {
    panelRecommendation = "Recommend adding a sub-panel, or confirm the existing panel has enough open slots and amperage headroom.";
  } else {
    panelRecommendation = "Recommend upgrading the main service panel (e.g. to 200A) — circuit count and load are too high for a typical existing panel.";
  }

  return {
    rooms: roomEstimates,
    totals,
    panelRecommendation,
    totalArea: Number(totalArea) || roomEstimates.reduce((s, r) => s + r.area, 0),
  };
}
