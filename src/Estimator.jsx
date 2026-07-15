import { useState } from "react";
import { ROOM_TYPES, makeEmptyRoom, estimateProject, ADDITION_ROOM_TYPE, FOUNDATION_TYPES, ROOF_TYPES } from "./estimatorLogic";

const C = {
  bg: "#0A0A0B",
  surface: "#111113",
  card: "#16161A",
  border: "#242428",
  gold: "#C9A84C",
  goldLight: "#E8C97A",
  white: "#F5F4EF",
  muted: "#888888",
  accent2: "#4C7BC9",
};

const s = {
  wrap: { maxWidth: 900, margin: "0 auto", background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: "44px 40px" },
  progressRow: { display: "flex", gap: 8, marginBottom: 40 },
  progressStep: { flex: 1, height: 4, borderRadius: 2, background: C.border },
  progressStepActive: { background: C.gold },
  stepTag: { fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: C.gold, fontWeight: 600, marginBottom: 10 },
  stepTitle: { fontSize: 26, fontWeight: 700, color: C.white, marginBottom: 8 },
  stepSub: { fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 32 },
  label: { fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: C.muted, fontWeight: 600, marginBottom: 8, display: "block" },
  input: { width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: "13px 15px", fontSize: 14, color: C.white, fontFamily: "inherit", outline: "none", boxSizing: "border-box" },
  formGroup: { marginBottom: 22 },
  formRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
  formRow3: { display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 20 },
  roomCard: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px", marginBottom: 16 },
  roomCardHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  roomNum: { fontSize: 13, color: C.gold, fontWeight: 700, letterSpacing: 1 },
  removeBtn: { background: "none", border: `1px solid ${C.border}`, color: C.muted, borderRadius: 4, padding: "6px 12px", fontSize: 12, cursor: "pointer" },
  addBtn: { background: "none", border: `1px dashed ${C.gold}66`, color: C.gold, borderRadius: 6, padding: "14px", fontSize: 14, fontWeight: 600, cursor: "pointer", width: "100%" },
  btnRow: { display: "flex", justifyContent: "space-between", marginTop: 36, gap: 12 },
  btnPrimary: { background: C.gold, color: C.bg, border: "none", borderRadius: 6, padding: "14px 30px", fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: "pointer", letterSpacing: 0.5 },
  btnSecondary: { background: "transparent", color: C.white, border: `1px solid ${C.border}`, borderRadius: 6, padding: "14px 30px", fontSize: 14, fontFamily: "inherit", cursor: "pointer" },
  btnDisabled: { opacity: 0.4, cursor: "not-allowed" },
  roomTabs: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 },
  roomTab: { background: C.surface, border: `1px solid ${C.border}`, color: C.muted, borderRadius: 20, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" },
  roomTabActive: { background: `${C.gold}22`, borderColor: C.gold, color: C.gold, fontWeight: 600 },
  subheading: { fontSize: 14, fontWeight: 700, color: C.white, margin: "24px 0 14px", paddingTop: 20, borderTop: `1px solid ${C.border}` },
  subheadingFirst: { fontSize: 14, fontWeight: 700, color: C.white, margin: "0 0 14px" },
  checkGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  checkRow: { display: "flex", alignItems: "center", gap: 10, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: "12px 14px", fontSize: 13, color: C.white, cursor: "pointer" },
  radioRow: { display: "flex", gap: 12, marginBottom: 4 },
  radioOpt: { flex: 1, display: "flex", alignItems: "center", gap: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: "12px 14px", fontSize: 13, color: C.white, cursor: "pointer" },
  radioOptActive: { borderColor: C.gold, background: `${C.gold}14` },
  smallNote: { fontSize: 12, color: C.muted, lineHeight: 1.6, marginTop: 6 },
  resultSection: { marginBottom: 32 },
  resultHead: { fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: C.gold, fontWeight: 700, marginBottom: 14 },
  resultRoomCard: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "24px", marginBottom: 16 },
  resultRoomTitle: { fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 4 },
  resultRoomMeta: { fontSize: 12, color: C.muted, marginBottom: 16 },
  resultGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 },
  resultItem: { fontSize: 13, color: C.white },
  resultItemLabel: { fontSize: 11, color: C.muted, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 4 },
  resultNoteList: { marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 6 },
  resultNote: { fontSize: 12, color: C.goldLight, lineHeight: 1.6 },
  shopWrap: { marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.border}` },
  shopTitle: { fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.muted, fontWeight: 600, marginBottom: 10 },
  shopGrid: { display: "flex", flexWrap: "wrap", gap: 8 },
  shopLink: { display: "inline-flex", alignItems: "center", gap: 6, background: C.card, border: `1px solid ${C.border}`, color: C.gold, textDecoration: "none", fontSize: 12, fontWeight: 600, padding: "7px 12px", borderRadius: 20 },
  totalsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginBottom: 24 },
  totalCard: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px", textAlign: "center" },
  totalNum: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, color: C.gold, letterSpacing: 1 },
  totalLabel: { fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginTop: 4 },
  panelBox: { background: `${C.accent2}18`, border: `1px solid ${C.accent2}55`, borderRadius: 8, padding: "18px 20px", fontSize: 13, color: C.white, lineHeight: 1.6, marginBottom: 24 },
  disclaimer: { fontSize: 12, color: C.muted, lineHeight: 1.7, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 20px", marginTop: 8 },
  restartBtn: { background: "transparent", color: C.gold, border: `1px solid ${C.gold}55`, borderRadius: 6, padding: "12px 24px", fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" },
};

const STEP_LABELS = ["Project", "Rooms", "Details", "Estimate"];

export default function Estimator() {
  const [step, setStep] = useState(0);
  const [totalArea, setTotalArea] = useState("");
  const [rooms, setRooms] = useState([makeEmptyRoom(1)]);
  const [activeRoomIdx, setActiveRoomIdx] = useState(0);
  const [nextId, setNextId] = useState(2);
  const [result, setResult] = useState(null);

  const updateRoom = (id, patch) => setRooms((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const updateRoomDeep = (id, key, patch) => setRooms((rs) => rs.map((r) => (r.id === id ? { ...r, [key]: { ...r[key], ...patch } } : r)));

  const addRoom = () => {
    setRooms((rs) => [...rs, makeEmptyRoom(nextId)]);
    setNextId((n) => n + 1);
  };
  const removeRoom = (id) => {
    setRooms((rs) => (rs.length > 1 ? rs.filter((r) => r.id !== id) : rs));
    setActiveRoomIdx(0);
  };

  const canLeaveRoomsStep = rooms.every((r) => r.name.trim() && Number(r.area) > 0);

  const goToDetails = () => {
    setActiveRoomIdx(0);
    setStep(2);
  };

  const generateEstimate = () => {
    setResult(estimateProject(rooms, totalArea));
    setStep(3);
  };

  const restart = () => {
    setTotalArea("");
    setRooms([makeEmptyRoom(1)]);
    setNextId(2);
    setActiveRoomIdx(0);
    setResult(null);
    setStep(0);
  };

  const activeRoom = rooms[activeRoomIdx];

  return (
    <div style={s.wrap}>
      <style>{`.shop-link:hover { border-color: ${C.gold} !important; background: ${C.surface} !important; }`}</style>
      <div style={s.progressRow}>
        {STEP_LABELS.map((_, i) => (
          <div key={i} style={{ ...s.progressStep, ...(i <= step ? s.progressStepActive : {}) }} />
        ))}
      </div>

      {/* STEP 0 — Project basics */}
      {step === 0 && (
        <>
          <div style={s.stepTag}>Step 1 of 4</div>
          <h3 style={s.stepTitle}>Tell us about the project</h3>
          <p style={s.stepSub}>Start with the total project area. We'll break it down room by room next.</p>
          <div style={s.formGroup}>
            <label style={s.label}>Total Area of the Project (sq ft) *</label>
            <input
              type="number"
              min="1"
              style={s.input}
              placeholder="e.g. 1200"
              value={totalArea}
              onChange={(e) => setTotalArea(e.target.value)}
            />
          </div>
          <div style={s.btnRow}>
            <div />
            <button
              style={{ ...s.btnPrimary, ...(Number(totalArea) > 0 ? {} : s.btnDisabled) }}
              disabled={!(Number(totalArea) > 0)}
              onClick={() => setStep(1)}
            >
              Next: Add Rooms →
            </button>
          </div>
        </>
      )}

      {/* STEP 1 — Rooms list */}
      {step === 1 && (
        <>
          <div style={s.stepTag}>Step 2 of 4</div>
          <h3 style={s.stepTitle}>What rooms are in the project?</h3>
          <p style={s.stepSub}>Add every room, its type, and its floor area. This drives the material and electrical breakdown.</p>

          {rooms.map((room, i) => (
            <div key={room.id} style={s.roomCard}>
              <div style={s.roomCardHead}>
                <span style={s.roomNum}>Room {i + 1}</span>
                {rooms.length > 1 && (
                  <button style={s.removeBtn} onClick={() => removeRoom(room.id)}>
                    Remove
                  </button>
                )}
              </div>
              <div style={s.formRow3}>
                <div>
                  <label style={s.label}>Room Name *</label>
                  <input
                    style={s.input}
                    placeholder="e.g. Master Bathroom"
                    value={room.name}
                    onChange={(e) => updateRoom(room.id, { name: e.target.value })}
                  />
                </div>
                <div>
                  <label style={s.label}>Type of Room *</label>
                  <select style={s.input} value={room.type} onChange={(e) => updateRoom(room.id, { type: e.target.value })}>
                    {ROOM_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Area (sq ft) *</label>
                  <input
                    type="number"
                    min="1"
                    style={s.input}
                    placeholder="e.g. 120"
                    value={room.area}
                    onChange={(e) => updateRoom(room.id, { area: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ))}

          <button style={s.addBtn} onClick={addRoom}>
            + Add Another Room
          </button>

          <div style={s.btnRow}>
            <button style={s.btnSecondary} onClick={() => setStep(0)}>
              ← Back
            </button>
            <button style={{ ...s.btnPrimary, ...(canLeaveRoomsStep ? {} : s.btnDisabled) }} disabled={!canLeaveRoomsStep} onClick={goToDetails}>
              Next: Room Details →
            </button>
          </div>
        </>
      )}

      {/* STEP 2 — Per-room details */}
      {step === 2 && activeRoom && (
        <>
          <div style={s.stepTag}>Step 3 of 4</div>
          <h3 style={s.stepTitle}>Room details: {activeRoom.name || activeRoom.type}</h3>
          <p style={s.stepSub}>Doors & finishes, electrical needs, plumbing, and insulation for this room.</p>

          <div style={s.roomTabs}>
            {rooms.map((r, i) => (
              <button
                key={r.id}
                style={{ ...s.roomTab, ...(i === activeRoomIdx ? s.roomTabActive : {}) }}
                onClick={() => setActiveRoomIdx(i)}
              >
                {r.name || r.type}
              </button>
            ))}
          </div>

          {/* Doors & finishes */}
          <div style={s.subheadingFirst}>Doors & Finishes</div>
          <div style={s.formRow}>
            <div>
              <label style={s.label}>Door Type</label>
              <div style={s.radioRow}>
                {["regular", "hidden"].map((v) => (
                  <label key={v} style={{ ...s.radioOpt, ...(activeRoom.doorType === v ? s.radioOptActive : {}) }}>
                    <input type="radio" checked={activeRoom.doorType === v} onChange={() => updateRoom(activeRoom.id, { doorType: v })} />
                    {v === "regular" ? "Regular Door" : "Hidden / Invisible Door"}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label style={s.label}>Door Style</label>
              <div style={s.radioRow}>
                {["regular", "arc"].map((v) => (
                  <label key={v} style={{ ...s.radioOpt, ...(activeRoom.doorStyle === v ? s.radioOptActive : {}) }}>
                    <input type="radio" checked={activeRoom.doorStyle === v} onChange={() => updateRoom(activeRoom.id, { doorStyle: v })} />
                    {v === "regular" ? "Regular / Flat Top" : "Arched Top"}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div style={s.formGroup}>
            <label style={s.label}>Paint Color</label>
            <input
              style={s.input}
              placeholder="e.g. Sherwin-Williams Agreeable Gray"
              value={activeRoom.paintColor}
              onChange={(e) => updateRoom(activeRoom.id, { paintColor: e.target.value })}
            />
          </div>

          {/* Addition construction (new exterior room, e.g. sunroom) */}
          {activeRoom.type === ADDITION_ROOM_TYPE && (
            <>
              <div style={s.subheading}>Addition Construction</div>
              <div style={s.formRow}>
                <div>
                  <label style={s.label}>Foundation</label>
                  <select
                    style={s.input}
                    value={activeRoom.addition.foundationType}
                    onChange={(e) => updateRoomDeep(activeRoom.id, "addition", { foundationType: e.target.value })}
                  >
                    {FOUNDATION_TYPES.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Roof Type</label>
                  <select
                    style={s.input}
                    value={activeRoom.addition.roofType}
                    onChange={(e) => updateRoomDeep(activeRoom.id, "addition", { roofType: e.target.value })}
                  >
                    {ROOF_TYPES.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={s.formRow}>
                <div>
                  <label style={s.label}>Number of Windows</label>
                  <input
                    type="number"
                    min="0"
                    style={s.input}
                    value={activeRoom.addition.windowCount}
                    onChange={(e) => updateRoomDeep(activeRoom.id, "addition", { windowCount: e.target.value })}
                  />
                </div>
                <div>
                  <label style={s.label}>Exterior Wall Framing</label>
                  <div style={s.radioRow}>
                    {["2x4", "2x6"].map((v) => (
                      <label key={v} style={{ ...s.radioOpt, ...(activeRoom.addition.wallFraming === v ? s.radioOptActive : {}) }}>
                        <input
                          type="radio"
                          checked={activeRoom.addition.wallFraming === v}
                          onChange={() => updateRoomDeep(activeRoom.id, "addition", { wallFraming: v })}
                        />
                        {v === "2x4" ? "2x4 (R-13)" : "2x6 (R-21)"}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <p style={s.smallNote}>
                Since this is a new exterior structure, we'll also estimate foundation, roofing, siding, and window/heat-load impact — on top of the electrical, plumbing, and insulation questions below.
              </p>
            </>
          )}

          {/* Electrical */}
          <div style={s.subheading}>Electrical Needs</div>
          <label style={s.label}>Appliances Running on Electrical Points</label>
          <div style={s.checkGrid}>
            {[
              ["fridge", "Refrigerator"],
              ["microwave", "Built-in Microwave"],
              ["dishwasher", "Dishwasher"],
              ["oven", "Range / Oven"],
              ["washerDryer", "Washer & Dryer"],
            ].map(([key, label]) => (
              <label key={key} style={s.checkRow}>
                <input
                  type="checkbox"
                  checked={activeRoom.appliances[key]}
                  onChange={(e) => updateRoomDeep(activeRoom.id, "appliances", { [key]: e.target.checked })}
                />
                {label}
              </label>
            ))}
          </div>

          <div style={{ ...s.formRow3, marginTop: 18 }}>
            <div>
              <label style={s.label}>Can Lights</label>
              <input
                type="number"
                min="0"
                style={s.input}
                value={activeRoom.lighting.canLights}
                onChange={(e) => updateRoomDeep(activeRoom.id, "lighting", { canLights: e.target.value })}
              />
            </div>
            <div>
              <label style={s.label}>Chandeliers / Heavy Fixtures</label>
              <input
                type="number"
                min="0"
                style={s.input}
                value={activeRoom.lighting.chandeliers}
                onChange={(e) => updateRoomDeep(activeRoom.id, "lighting", { chandeliers: e.target.value })}
              />
            </div>
            <div>
              <label style={s.label}>Regular Light Fixtures</label>
              <input
                type="number"
                min="0"
                style={s.input}
                value={activeRoom.lighting.regularFixtures}
                onChange={(e) => updateRoomDeep(activeRoom.id, "lighting", { regularFixtures: e.target.value })}
              />
            </div>
          </div>
          <p style={s.smallNote}>
            We'll suggest 15A vs 20A outlets, outlet counts, dedicated circuits, and whether to extend the existing panel or add a new one based on these answers.
          </p>

          {/* Plumbing */}
          <div style={s.subheading}>Plumbing Needs</div>
          {["Kitchen", "Bathroom", "Laundry Room"].includes(activeRoom.type) ? (
            <p style={s.smallNote}>
              {activeRoom.type} rooms automatically include standard plumbing rough-in (sink/fixtures) in the estimate.
            </p>
          ) : (
            <label style={s.checkRow}>
              <input
                type="checkbox"
                checked={activeRoom.needsPlumbing}
                onChange={(e) => updateRoom(activeRoom.id, { needsPlumbing: e.target.checked })}
              />
              This room needs plumbing (e.g. wet bar, auxiliary sink)
            </label>
          )}

          {/* Insulation */}
          <div style={s.subheading}>Insulation</div>
          {activeRoom.type === ADDITION_ROOM_TYPE ? (
            <p style={s.smallNote}>
              R-value is determined by the exterior wall framing selected above ({activeRoom.addition.wallFraming === "2x6" ? "2x6 → R-21" : "2x4 → R-13"}).
            </p>
          ) : (
            <div style={s.radioRow}>
              {["regular", "soundproof"].map((v) => (
                <label key={v} style={{ ...s.radioOpt, ...(activeRoom.insulation === v ? s.radioOptActive : {}) }}>
                  <input type="radio" checked={activeRoom.insulation === v} onChange={() => updateRoom(activeRoom.id, { insulation: v })} />
                  {v === "regular" ? "Regular (Fiberglass Batt)" : "Special Soundproof (Home Theater / Media)"}
                </label>
              ))}
            </div>
          )}

          <div style={s.btnRow}>
            <button style={s.btnSecondary} onClick={() => setStep(1)}>
              ← Back to Rooms
            </button>
            {activeRoomIdx < rooms.length - 1 ? (
              <button style={s.btnPrimary} onClick={() => setActiveRoomIdx((i) => i + 1)}>
                Next Room →
              </button>
            ) : (
              <button style={s.btnPrimary} onClick={generateEstimate}>
                Generate Estimate →
              </button>
            )}
          </div>
        </>
      )}

      {/* STEP 3 — Results */}
      {step === 3 && result && (
        <>
          <div style={s.stepTag}>Step 4 of 4</div>
          <h3 style={s.stepTitle}>Preliminary Material Estimate</h3>
          <p style={s.stepSub}>Based on {result.totalArea} sq ft across {result.rooms.length} room(s).</p>

          <div style={s.totalsGrid}>
            <div style={s.totalCard}>
              <div style={s.totalNum}>{result.totals.drywallSheets}</div>
              <div style={s.totalLabel}>Drywall Sheets (4x8)</div>
            </div>
            <div style={s.totalCard}>
              <div style={s.totalNum}>{result.totals.paintGallons}</div>
              <div style={s.totalLabel}>Paint (gallons)</div>
            </div>
            <div style={s.totalCard}>
              <div style={s.totalNum}>{result.totals.flooringSqft}</div>
              <div style={s.totalLabel}>Flooring (sq ft)</div>
            </div>
            <div style={s.totalCard}>
              <div style={s.totalNum}>{result.totals.acTons}</div>
              <div style={s.totalLabel}>AC Tons Needed</div>
            </div>
            <div style={s.totalCard}>
              <div style={s.totalNum}>{result.totals.generalOutlets15A + result.totals.generalOutlets20A + result.totals.counterOutlets20A}</div>
              <div style={s.totalLabel}>Total Outlets</div>
            </div>
            <div style={s.totalCard}>
              <div style={s.totalNum}>{result.totals.newCircuits}</div>
              <div style={s.totalLabel}>New Circuits (est.)</div>
            </div>
            <div style={s.totalCard}>
              <div style={s.totalNum}>{result.totals.dedicatedCircuits}</div>
              <div style={s.totalLabel}>Dedicated Appliance Circuits</div>
            </div>
            <div style={s.totalCard}>
              <div style={s.totalNum}>{result.totals.insulationSqft}</div>
              <div style={s.totalLabel}>Insulation (sq ft)</div>
            </div>
            <div style={s.totalCard}>
              <div style={s.totalNum}>{result.totals.wire14_2Ft + result.totals.wire12_2Ft + result.totals.wire240Ft}</div>
              <div style={s.totalLabel}>Wire (linear ft)</div>
            </div>
            <div style={s.totalCard}>
              <div style={s.totalNum}>{result.totals.wireStaples}</div>
              <div style={s.totalLabel}>Cable Staples</div>
            </div>
            <div style={s.totalCard}>
              <div style={s.totalNum}>{result.totals.switchCount}</div>
              <div style={s.totalLabel}>Switches</div>
            </div>
            <div style={s.totalCard}>
              <div style={s.totalNum}>{result.totals.outletPlates}</div>
              <div style={s.totalLabel}>Outlet Plates</div>
            </div>
            <div style={s.totalCard}>
              <div style={s.totalNum}>{result.totals.baseboardLinearFt}</div>
              <div style={s.totalLabel}>Baseboard (linear ft)</div>
            </div>
            <div style={s.totalCard}>
              <div style={s.totalNum}>{result.totals.casingLinearFt}</div>
              <div style={s.totalLabel}>Door/Window Trim (ft)</div>
            </div>
            <div style={s.totalCard}>
              <div style={s.totalNum}>{result.totals.drywallScrewBoxes}</div>
              <div style={s.totalLabel}>Drywall Screw Boxes</div>
            </div>
            <div style={s.totalCard}>
              <div style={s.totalNum}>{result.totals.caulkTubes + result.totals.adhesiveTubes}</div>
              <div style={s.totalLabel}>Caulk + Adhesive Tubes</div>
            </div>
            {result.totals.vaporBarrierSqft > 0 && (
              <div style={s.totalCard}>
                <div style={s.totalNum}>{result.totals.vaporBarrierSqft}</div>
                <div style={s.totalLabel}>Vapor Barrier (sq ft)</div>
              </div>
            )}
            {result.totals.houseWrapSqft > 0 && (
              <div style={s.totalCard}>
                <div style={s.totalNum}>{result.totals.houseWrapSqft}</div>
                <div style={s.totalLabel}>House Wrap (sq ft)</div>
              </div>
            )}
            {result.totals.roofSquares > 0 && (
              <>
                {(result.totals.concreteSqft > 0 || result.totals.footingLinearFt > 0 || result.totals.piers > 0) && (
                  <div style={s.totalCard}>
                    <div style={s.totalNum}>{result.totals.concreteSqft || result.totals.footingLinearFt || result.totals.piers}</div>
                    <div style={s.totalLabel}>
                      {result.totals.concreteSqft > 0 ? "Foundation Slab (sq ft)" : result.totals.footingLinearFt > 0 ? "Footing (linear ft)" : "Foundation Piers"}
                    </div>
                  </div>
                )}
                <div style={s.totalCard}>
                  <div style={s.totalNum}>{result.totals.roofSquares}</div>
                  <div style={s.totalLabel}>Roofing (squares)</div>
                </div>
                <div style={s.totalCard}>
                  <div style={s.totalNum}>{result.totals.sidingSqft}</div>
                  <div style={s.totalLabel}>Siding (sq ft)</div>
                </div>
                <div style={s.totalCard}>
                  <div style={s.totalNum}>{result.totals.windowCount}</div>
                  <div style={s.totalLabel}>Windows</div>
                </div>
              </>
            )}
          </div>

          <div style={s.panelBox}>
            <strong>⚡ Panel Recommendation:</strong> {result.panelRecommendation}
          </div>

          <div style={s.resultSection}>
            <div style={s.resultHead}>Room-by-Room Breakdown</div>
            {result.rooms.map((r) => (
              <div key={r.id} style={s.resultRoomCard}>
                <div style={s.resultRoomTitle}>{r.name}</div>
                <div style={s.resultRoomMeta}>
                  {r.type} · {r.area} sq ft {r.paintColor ? `· Paint: ${r.paintColor}` : ""}
                </div>
                <div style={s.resultGrid}>
                  <div style={s.resultItem}>
                    <div style={s.resultItemLabel}>Drywall</div>
                    {r.drywallSheets} sheets
                  </div>
                  <div style={s.resultItem}>
                    <div style={s.resultItemLabel}>Paint</div>
                    {r.paintGallons} gal
                  </div>
                  <div style={s.resultItem}>
                    <div style={s.resultItemLabel}>Flooring</div>
                    {r.flooringSqft} sq ft
                  </div>
                  <div style={s.resultItem}>
                    <div style={s.resultItemLabel}>AC Size</div>
                    {r.acTons} ton
                  </div>
                  <div style={s.resultItem}>
                    <div style={s.resultItemLabel}>General Outlets</div>
                    {r.generalOutlets} × {r.generalOutletAmp}A
                  </div>
                  {r.counterOutlets > 0 && (
                    <div style={s.resultItem}>
                      <div style={s.resultItemLabel}>Counter Outlets</div>
                      {r.counterOutlets} × 20A GFCI
                    </div>
                  )}
                  <div style={s.resultItem}>
                    <div style={s.resultItemLabel}>Insulation</div>
                    {r.insulationSqft} sq ft
                  </div>
                  <div style={s.resultItem}>
                    <div style={s.resultItemLabel}>Wire</div>
                    {r.wire14_2Ft > 0 && `${r.wire14_2Ft} ft 14/2`}
                    {r.wire14_2Ft > 0 && r.wire12_2Ft > 0 && " · "}
                    {r.wire12_2Ft > 0 && `${r.wire12_2Ft} ft 12/2`}
                    {r.wire240Ft > 0 && ` · ${r.wire240Ft} ft 240V`}
                  </div>
                  <div style={s.resultItem}>
                    <div style={s.resultItemLabel}>Staples / Switches / Plates</div>
                    {r.wireStaples} staples · {r.switchCount} switches · {r.outletPlates} plates
                  </div>
                  <div style={s.resultItem}>
                    <div style={s.resultItemLabel}>Baseboard & Trim</div>
                    {r.baseboardLinearFt} ft base · {r.casingLinearFt} ft casing
                  </div>
                  <div style={s.resultItem}>
                    <div style={s.resultItemLabel}>Fasteners & Sealant</div>
                    {r.drywallScrewBoxes} screw box(es) · {r.caulkTubes} caulk · {r.adhesiveTubes} adhesive
                  </div>
                  {r.vaporBarrierSqft > 0 && (
                    <div style={s.resultItem}>
                      <div style={s.resultItemLabel}>Vapor Barrier</div>
                      {r.vaporBarrierSqft} sq ft
                    </div>
                  )}
                  {r.houseWrapSqft > 0 && (
                    <div style={s.resultItem}>
                      <div style={s.resultItemLabel}>House Wrap</div>
                      {r.houseWrapSqft} sq ft
                    </div>
                  )}
                  {r.addition && (
                    <>
                      <div style={s.resultItem}>
                        <div style={s.resultItemLabel}>Roofing</div>
                        {r.addition.roofSquares} squares
                      </div>
                      <div style={s.resultItem}>
                        <div style={s.resultItemLabel}>Siding</div>
                        {r.addition.sidingSqft} sq ft
                      </div>
                      {r.addition.windowCount > 0 && (
                        <div style={s.resultItem}>
                          <div style={s.resultItemLabel}>Windows</div>
                          {r.addition.windowCount} ({r.addition.glazingSqft} sq ft glazing)
                        </div>
                      )}
                    </>
                  )}
                </div>

                {(r.dedicatedCircuits.length > 0 || r.doorNotes.length > 0 || r.lightingNotes.length > 0 || r.plumbingFixtures.length > 0 || r.insulationType || r.addition) && (
                  <div style={s.resultNoteList}>
                    {r.dedicatedCircuits.map((c, idx) => (
                      <div key={idx} style={s.resultNote}>
                        • Dedicated circuit: {c.label} ({c.amp}A / {c.volt}V)
                      </div>
                    ))}
                    {r.doorNotes.map((n, idx) => (
                      <div key={idx} style={s.resultNote}>
                        • {n}
                      </div>
                    ))}
                    {r.lightingNotes.map((n, idx) => (
                      <div key={idx} style={s.resultNote}>
                        • {n}
                      </div>
                    ))}
                    {r.plumbingFixtures.map((n, idx) => (
                      <div key={idx} style={s.resultNote}>
                        • Plumbing: {n}
                      </div>
                    ))}
                    <div style={s.resultNote}>• Insulation: {r.insulationType}</div>
                    {r.addition && (
                      <>
                        <div style={s.resultNote}>• Foundation: {r.addition.foundationNote}</div>
                        <div style={s.resultNote}>
                          • Roof-to-house tie-in: ~{r.addition.tieInFlashingFt} linear ft of flashing where the new roof meets the existing roofline.
                        </div>
                        <div style={s.resultNote}>• {r.addition.permitNote}</div>
                      </>
                    )}
                  </div>
                )}

                {r.shopLinks.length > 0 && (
                  <div style={s.shopWrap}>
                    <div style={s.shopTitle}>Shop Materials on Home Depot</div>
                    <div style={s.shopGrid}>
                      {r.shopLinks.map((l, idx) => (
                        <a key={idx} href={l.url} target="_blank" rel="noreferrer" style={s.shopLink} className="shop-link">
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={s.disclaimer}>
            These figures are preliminary rule-of-thumb estimates (8 ft ceilings assumed, room shapes approximated as square from area, ~10% material waste factored in). Use them as a starting point for a client quote — confirm exact panel capacity, circuit loads, and code requirements with a licensed electrician/plumber before finalizing. "Shop on Home Depot" links open live search results for that material — they're not pinned to a specific product or price, since availability and pricing vary by store and change over time.
          </div>

          <div style={s.btnRow}>
            <button style={s.btnSecondary} onClick={() => setStep(2)}>
              ← Edit Details
            </button>
            <button style={s.restartBtn} onClick={restart}>
              Start New Estimate
            </button>
          </div>
        </>
      )}
    </div>
  );
}
