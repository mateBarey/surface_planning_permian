// components/DirectionalTab.js - EXACT v2 HTML structure

export function createDirectionalSection() {
    return `
        <div class="tab" id="tabDir">
            <div class="tab-hdr" onclick="toggleTab('tabDir')">
                <div class="tab-num">2</div>
                <div class="tab-label">Directional</div>
                <div class="tab-status ok">SET</div>
                <span class="tab-chev">▸</span>
            </div>
            <div class="tab-body">
                <div class="field">
                    <div class="field-lbl">Build-Up Rate (°/100ft)</div>
                    <input class="inp" id="bur" value="12" style="width:80px;">
                </div>
                <div class="field">
                    <div class="field-lbl">Curve Angle (°)</div>
                    <input class="inp" id="curveAngle" value="90" style="width:80px;">
                </div>
                <div class="field">
                    <div class="field-lbl">KOP TVD (ft) — global default</div>
                    <input class="inp" id="kopTvd" value="6500" style="width:120px;">
                </div>
                <div class="field">
                    <div class="field-lbl">Well Spacing (ft)</div>
                    <input class="inp" id="wellSpacing" value="1320" style="width:120px;">
                </div>
                <div class="field">
                    <div class="field-lbl">Computed Curve Profile</div>
                    <div id="curveComputed" style="font:400 10px var(--mono);color:var(--tx2);">
                        Radius: 477.5'<br>
                        Arc Length: 748.9' (MD consumed)<br>
                        Backbuild: 477.5' (horiz displacement)<br>
                        Circumference: 748.9'
                    </div>
                </div>
            </div>
        </div>
    `;
}
