// MINIMAL CESIUM ONLY - v5.3.3
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

async function initCesium() {
    console.log('=== MINIMAL CESIUM INIT ===');
    console.log('Token:', import.meta.env.VITE_CESIUM_ION_TOKEN ? 'SET' : 'MISSING');
    
    try {
        // EXACT v4.2.0 pattern
        const imageryProvider = await Cesium.IonImageryProvider.fromAssetId(2);
        console.log('Imagery provider created');
        
        viewer = new Cesium.Viewer('cesiumContainer', {
            baseLayer: new Cesium.ImageryLayer(imageryProvider),
            terrain: Cesium.Terrain.fromWorldTerrain({
                requestVertexNormals: true
            }),
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
        console.log('Viewer created');
        
        viewer.scene.globe.enableLighting = true;
        viewer.scene.fog.enabled = false;
        viewer._cesiumWidget._creditContainer.style.display = "none";
        
        viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(
                PERMIAN_CENTER.longitude,
                PERMIAN_CENTER.latitude,
                PERMIAN_CENTER.height
            ),
            orientation: {
                heading: 0,
                pitch: Cesium.Math.toRadians(-65),
                roll: 0
            }
        });
        
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
        
        console.log('✅ CESIUM INITIALIZED SUCCESSFULLY');
    } catch (err) {
        console.error('❌ CESIUM INIT FAILED:', err);
    }
}

async function init() {
    console.log('Starting init...');
    createSidebar();
    await initCesium();
    console.log('Init complete');
}

init();