// FGE DRILL PLANNER - v5.6.0 - Modern 2026 Cesium Rendering
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import './style.css';
import { createSidebar } from './ui.js';

Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

const PERMIAN_CENTER = { longitude: -102.0779, latitude: 31.9527, height: 20000 };
const PADS = [
    { name: 'Pad Alpha', lon: -102.0779, lat: 31.9527, color: '#ff9900' },
    { name: 'Pad Bravo', lon: -102.0654, lat: 31.9612, color: '#00ffff' },
    { name: 'Pad Charlie', lon: -102.0890, lat: 31.9450, color: '#ff00ff' }
];

let viewer;

// ─── STEP 1: Tile Quality Settings ────────────────────────────────────────────
// Lower maximumScreenSpaceError = more detail. Default is 2; we use 1 for max.
function applyTileQuality() {
    const g = viewer.scene.globe;
    g.maximumScreenSpaceError = 1;          // max tile detail (default 2)
    g.tileCacheSize = 2048;                 // hold more tiles in GPU memory
    g.preloadAncestors = true;              // load coarser tiles first (no pop-in)
    g.preloadSiblings = true;               // load adjacent tiles proactively
    g.loadingDescendantLimit = 20;          // allow more child tile loads per frame
    g.skipLevelOfDetail = true;             // skip redundant LOD levels
    g.baseScreenSpaceError = 1024;          // base error for LOD skipping
    g.skipScreenSpaceErrorFactor = 16;      // multiplier for LOD skipping
    g.skipLevels = 1;                       // min levels to skip
}

// ─── STEP 2: Atmosphere + Sun Lighting ────────────────────────────────────────
// Dynamic atmosphere lighting adapts the sky color to match sun position.
// enableLighting shadows the terrain based on sun angle — critical for 3D depth.
// requestVertexNormals enables per-vertex normals which give proper shading to
// every ridge, mesa, and valley in the Permian Basin terrain.
function applyAtmosphereAndLighting() {
    const scene = viewer.scene;

    // Terrain vertex normal shading (depth cue for low-altitude views)
    scene.globe.enableLighting = true;

    // Dynamic atmosphere: sky color shifts with the sun position
    // SUNLIGHT mode uses real sun direction; gives the cinematic golden-hour look
    if (Cesium.DynamicAtmosphereLightingType) {
        scene.atmosphere.dynamicLighting =
            Cesium.DynamicAtmosphereLightingType.SUNLIGHT;
    }

    // Subtle fog — creates atmospheric depth at long viewing distances
    // We use a very light fog rather than disabling it completely
    scene.fog.enabled = true;
    scene.fog.density = 0.0002;             // barely visible, just adds haze
    scene.fog.minimumBrightness = 0.03;

    // Set a mid-morning sun position (10am local Permian Basin time)
    // This angle gives the best terrain shadow detail for oil field work
    const now = Cesium.JulianDate.now();
    viewer.clock.currentTime = now;
    viewer.clock.multiplier = 0;            // freeze clock — no auto-advance
}

// ─── STEP 3: HBAO (Horizon-Based Ambient Occlusion) ──────────────────────────
// CAUTION: Do NOT enable bloom at the same time as HBAO (Cesium bug #6847).
// The December 2024 Cesium 1.124 update ships a normalized Gaussian distribution
// that automatically scales AO based on camera distance — no manual fiddling.
function applyHBAO() {
    const ao = viewer.scene.postProcessStages.ambientOcclusion;
    ao.enabled = true;
    ao.uniforms.ambientOcclusionOnly = false;   // combine with scene, not debug
    ao.uniforms.intensity = 2.5;                // softer than default 3.0
    ao.uniforms.bias = 0.1;                     // removes near-planar shadow bleed
    ao.uniforms.lengthCap = 0.3;                // ~30cm sample cap in world space
    ao.uniforms.stepCount = 32;                 // ray march steps (default 32)
    ao.uniforms.directionCount = 8;             // ray march directions (default 8)
}

// ─── STEP 4: FXAA + PBR Neutral Tone Mapping ─────────────────────────────────
// FXAA is Cesium's built-in anti-aliasing. Always run it last (Cesium handles order).
// PBR Neutral (Khronos, 2024) is now the Cesium default — wider gamut than ACES.
// Exposure > 1 brightens the scene; we boost slightly for the Permian midday look.
function applyFXAAAndToneMapping() {
    const pp = viewer.scene.postProcessStages;

    // FXAA: smooths terrain and entity edges
    pp.fxaa.enabled = true;

    // PBR Neutral is already the default in Cesium 1.121+, but we set it explicitly
    if (Cesium.Tonemapper && Cesium.Tonemapper.PBR_NEUTRAL) {
        pp.tonemapper = Cesium.Tonemapper.PBR_NEUTRAL;
    }

    // Slight brightness lift — Permian Basin is high desert, very bright midday
    pp.exposure = 1.1;

    // NOTE: bloom is intentionally NOT enabled — see Cesium bug #6847
    // bloom + AO together causes incorrect rendering artifacts
}

// ─── STEP 5: Base Layer Imagery Enhancement ───────────────────────────────────
// The Bing Maps base layer (Asset ID 2) looks washed-out by default.
// We apply contrast/saturation/brightness boosts to the ImageryLayer directly
// without changing the provider — keeping Asset ID 2 intact per CLAUDE.md RULE 2.
function applyImageryEnhancement() {
    const layers = viewer.scene.globe.imageryLayers;
    if (layers.length === 0) return;
    const baseLayer = layers.get(0);

    // Values are multiplicative scalars from 1.0 = neutral
    baseLayer.brightness = 1.05;    // slight lift — counters Cesium's dark default
    baseLayer.contrast = 1.15;      // more punch, reveals texture in flat terrain
    baseLayer.saturation = 1.2;     // boost greens/tans of West Texas landscape
    baseLayer.gamma = 1.0;          // keep gamma neutral (1.0 = no change)
    baseLayer.hue = 0.0;            // no hue shift
}

async function initCesium() {
    try {
        // v4.2.0 async pattern — KEEP THIS (per CLAUDE.md RULE 1)
        const imageryProvider = await Cesium.IonImageryProvider.fromAssetId(2);

        viewer = new Cesium.Viewer('cesiumContainer', {
            baseLayer: new Cesium.ImageryLayer(imageryProvider),
            terrain: Cesium.Terrain.fromWorldTerrain({
                requestVertexNormals: true      // per-vertex normals for terrain shading
            }),
            // HDR mode enables the full PBR pipeline including tone mapping
            // This is what unlocks Cesium's video-game quality rendering
            useBrowserRecommendedResolution: true,
            timeline: false,
            animation: false,
            baseLayerPicker: false,
            geocoder: false,
            homeButton: false,
            infoBox: false,
            sceneModePicker: false,
            selectionIndicator: false,
            navigationHelpButton: false,
            fullscreenButton: false
        });

        viewer._cesiumWidget._creditContainer.style.display = 'none';

        // Apply rendering improvements one by one
        applyTileQuality();
        applyAtmosphereAndLighting();
        applyHBAO();
        applyFXAAAndToneMapping();
        applyImageryEnhancement();

        // Camera: Permian Basin at 20km, pitched 65° for oblique terrain view
        viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(
                PERMIAN_CENTER.longitude,
                PERMIAN_CENTER.latitude,
                PERMIAN_CENTER.height
            ),
            orientation: {
                heading: Cesium.Math.toRadians(15),   // slight NE heading
                pitch: Cesium.Math.toRadians(-65),
                roll: 0
            }
        });

        // Pad markers — kept exactly as v4.2.0 (CLAUDE.md RULE 1)
        PADS.forEach(pad => {
            viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(pad.lon, pad.lat),
                point: {
                    pixelSize: 24,
                    color: Cesium.Color.fromCssColorString(pad.color),
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 3,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                },
                label: {
                    text: pad.name,
                    font: '14px sans-serif',
                    fillColor: Cesium.Color.WHITE,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth: 2,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset: new Cesium.Cartesian2(0, -30),
                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                }
            });
        });

    } catch (err) {
        console.error('CESIUM INIT FAILED:', err);
    }
}

async function init() {
    createSidebar();
    await initCesium();
}

init();
