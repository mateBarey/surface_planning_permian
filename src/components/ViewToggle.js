// components/ViewToggle.js - EXACT v2 HTML structure

export function createViewToggle() {
    return `
        <div class="sb-views">
            <div class="sb-vbtn on" onclick="setView('surface', this)">Surface 3D</div>
            <div class="sb-vbtn" onclick="setView('sub', this)">Subsurface</div>
        </div>
    `;
}

export function initViewToggle() {
    window.setView = function(v, btn) {
        document.querySelectorAll('.sb-vbtn').forEach(b => b.classList.remove('on'));
        if (btn) btn.classList.add('on');
        console.log(`Switched to ${v} view`);
        // TODO: Toggle between Cesium and Three.js views
    };
}
