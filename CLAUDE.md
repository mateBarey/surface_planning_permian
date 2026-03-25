# FGE DRILL PLANNER - CLAUDE OPERATIONAL GUIDE

**VERSION:** v5.0.0  
**LAST UPDATED:** 2026-03-24  
**PROJECT:** Permian Basin drilling pad placement tool (Cesium + Three.js)

---

## **CRITICAL RULES - READ BEFORE EVERY RESPONSE**

### **RULE 1: NEVER DELETE WORKING CODE**
- v4.2.0 used `async function initCesium()` and **IT WORKED**
- If code currently renders properly, DO NOT change it without evidence
- Evidence = production-level best practices from 3D GIS webapps, NOT random docs

### **RULE 2: RENDERING STACK (DO NOT CHANGE)**
- **Cesium Ion Bing Maps (Asset ID 2)** - KEEP THIS, it's free and works
- **Cesium.Viewer()** - async initialization pattern (v4.2.0 pattern)
- **Three.js overlay** - for post-processing effects
- **NO deck.gl** - has CDN loading failures in Claude artifacts

### **RULE 3: COORDINATE SYSTEM (DO NOT CHANGE)**
- **NAD83 State Plane** for Permian Basin
- **NOT WGS84** for internal calculations
- Only convert to WGS84 for Cesium display

### **RULE 4: EVIDENCE-BASED CHANGES ONLY**
- Before changing ANY code: search for production examples
- Look for: GitHub production repos, real 3D GIS webapps, industry best practices
- NOT: docs pages, tutorials, theoretical explanations
- If you can't find 3+ production examples, **DO NOT CHANGE**

---

## **CURRENT PLAN (PHASES 1-2 ONLY)**

### **PHASE 1: OPTIMIZE CESIUM RENDERING** ✅
**Goal:** 2026-level visuals with terrain lighting + Three.js effects

**Completed:**
- ✅ Added `requestVertexNormals: true` to terrain
- ✅ Enabled `viewer.scene.globe.enableLighting = true`
- ✅ Removed fog (`viewer.scene.fog.enabled = false`)
- ✅ Adjusted camera (pitch -65°, altitude 20km)
- ✅ Added Three.js transparent overlay
- ✅ Post-processing: SSAOPass, UnrealBloomPass, FXAA
- ✅ Camera sync between Cesium and Three.js

**Do NOT:**
- Change Cesium Ion imagery provider (keep Asset ID 2)
- Change async initialization pattern (keep v4.2.0 style)
- Add deck.gl or any other renderer

---

### **PHASE 2: PORT v2 UI & VISUALIZATION** 🔄 IN PROGRESS
**Goal:** Restore v2 HTML functionality in Vite structure

**File Structure:**
```
src/
├── main.js (current - has Cesium + Three.js)
├── style.css (current - has dark theme base)
├── quaternion.js (TODO - Q object)
├── geometry.js (TODO - Geo object)
├── state.js (TODO - STATE object)
└── ui.js (TODO - sidebar, tabs, buttons)
```

**TODO - Surface Visualization:**
- [ ] Port STATE object (aoi, benches, pads, wells)
- [ ] Port NAD83 → WGS84 conversion (sp2ll function)
- [ ] Add left sidebar with 4 tabs
- [ ] Add Cesium polygon layers:
  - AOI boundary (yellow)
  - Regulatory boundary (green)
  - Pad rectangles (with rotation)
  - SHL dots (green, 20px)
  - Well surface traces (colored by bench)
  - Toe dots (red, 20px)
- [ ] Add buttons:
  - Auto-Place Pads
  - Generate Wells
- [ ] Add stats footer (wells count, pads count, avg lateral, targets)

**DO NOT YET:**
- Port quaternion.js (not needed for surface view)
- Port geometry.js (not needed yet)
- Port 3D wellbore rendering (that's Phase 4)
- Port bench formation layers (that's Phase 4)

---

## **WHAT NOT TO DO (COMMON MISTAKES)**

### **MISTAKE 1: Suggesting deck.gl**
- deck.gl has CDN loading failures in Claude artifacts
- v2 HTML used deck.gl but we're migrating AWAY from it
- Use Cesium entities instead

### **MISTAKE 2: Changing working initialization**
- v4.2.0 used async/await and IT WORKED
- Don't change to sync without production evidence
- Don't change Cesium.Viewer() constructor usage

### **MISTAKE 3: Suggesting ESRI imagery**
- ESRI requires license for commercial use
- Cesium Ion Bing Maps is free and works
- Only optimize configuration, not provider

### **MISTAKE 4: Over-complicating**
- Focus on SURFACE view first (Phase 2)
- Don't add quaternion math yet
- Don't add 3D wellbore rendering yet
- Build incrementally

---

## **MEMORY HOOKS - CHECK BEFORE RESPONDING**

### **Hook 1: "What rendering stack are we using?"**
**Answer:** Cesium (terrain + imagery) + Three.js (effects overlay)  
**If you forget:** Re-read RULE 2

### **Hook 2: "Can I use deck.gl?"**
**Answer:** NO. It has CDN failures in Claude artifacts.  
**If you suggest it:** You fucked up, re-read RULE 2

### **Hook 3: "Should I change the Cesium imagery provider?"**
**Answer:** NO. Keep Asset ID 2 (Bing Maps). Only optimize config.  
**If you suggest changing it:** You fucked up, re-read RULE 2

### **Hook 4: "What coordinate system?"**
**Answer:** NAD83 State Plane for Permian Basin, convert to WGS84 for display  
**If you forget:** Re-read RULE 3

### **Hook 5: "Should I change this working code?"**
**Answer:** ONLY if you have 3+ production examples showing why  
**If you can't find examples:** DON'T CHANGE IT

---

## **SELF-CORRECTION CHECKLIST**

Before making ANY code change, ask yourself:

1. ✅ **Does this code currently work?**
   - If YES → Don't change without production evidence
   - If NO → Fix it

2. ✅ **Do I have 3+ production examples?**
   - If YES → Proceed with change
   - If NO → Don't change, or search more

3. ✅ **Am I staying on plan? (Phases 1-2)**
   - If YES → Continue
   - If NO → Stop, refocus on current phase

4. ✅ **Am I about to suggest deck.gl, ESRI, or change providers?**
   - If YES → You fucked up, re-read RULE 2
   - If NO → Continue

5. ✅ **Am I making assumptions without evidence?**
   - If YES → Stop, search for evidence
   - If NO → Continue

---

## **VERSION HISTORY**

### **v4.2.0** (LAST WORKING)
- Async initialization pattern
- Cesium Ion Bing Maps (Asset ID 2)
- Basic terrain rendering
- 3 test pads displayed

### **v5.0.0** (CURRENT)
- Optimized Cesium rendering (vertex normals, lighting)
- Three.js post-processing (SSAO, bloom, FXAA)
- Dark theme CSS
- Modern header/footer UI
- **KEPT:** async initialization (working pattern)
- **ADDED:** terrain lighting, post-processing
- **NEXT:** Port v2 UI (Phase 2)

---

## **EMERGENCY REVERT**

If something breaks:

1. Check what changed since last working version
2. Revert those changes
3. Test if it works again
4. If still broken, revert to v4.2.0 pattern

**v4.2.0 baseline:** async initCesium(), Cesium Ion Asset 2, basic terrain

---

**END OF CLAUDE.md**
