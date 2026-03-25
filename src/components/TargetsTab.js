// components/TargetsTab.js - EXACT v2 HTML structure

export function createTargetsSection() {
    return `
        <div class="tab" id="tabTargets">
            <div class="tab-hdr" onclick="toggleTab('tabTargets')">
                <div class="tab-num">4</div>
                <div class="tab-label">Targets</div>
                <div class="tab-status empty">0 WELLS</div>
                <span class="tab-chev">▸</span>
            </div>
            <div class="tab-body">
                <div class="field">
                    <div class="field-lbl">Target Benches</div>
                    <div id="targetBenches">
                        <label class="bench-row" style="cursor:pointer;">
                            <input type="checkbox" checked onchange="STATE.benches[0].active=this.checked" style="margin-right:8px;accent-color:var(--grn);">
                            <div class="bench-dot" style="background:#c4993d"></div>
                            <div class="bench-nm">AVL</div>
                            <div class="bench-v">8758'</div>
                        </label>
                        <label class="bench-row" style="cursor:pointer;">
                            <input type="checkbox" checked onchange="STATE.benches[1].active=this.checked" style="margin-right:8px;accent-color:var(--grn);">
                            <div class="bench-dot" style="background:#886633"></div>
                            <div class="bench-nm">FBS</div>
                            <div class="bench-v">9400'</div>
                        </label>
                        <label class="bench-row" style="cursor:pointer;">
                            <input type="checkbox" checked onchange="STATE.benches[2].active=this.checked" style="margin-right:8px;accent-color:var(--grn);">
                            <div class="bench-dot" style="background:#5a8844"></div>
                            <div class="bench-nm">SBSU</div>
                            <div class="bench-v">10030'</div>
                        </label>
                        <label class="bench-row" style="cursor:pointer;">
                            <input type="checkbox" checked onchange="STATE.benches[3].active=this.checked" style="margin-right:8px;accent-color:var(--grn);">
                            <div class="bench-dot" style="background:#775522"></div>
                            <div class="bench-nm">SBSL</div>
                            <div class="bench-v">10300'</div>
                        </label>
                        <label class="bench-row" style="cursor:pointer;">
                            <input type="checkbox" checked onchange="STATE.benches[4].active=this.checked" style="margin-right:8px;accent-color:var(--grn);">
                            <div class="bench-dot" style="background:#b87741"></div>
                            <div class="bench-nm">TBS</div>
                            <div class="bench-v">11430'</div>
                        </label>
                        <label class="bench-row" style="cursor:pointer;">
                            <input type="checkbox" checked onchange="STATE.benches[5].active=this.checked" style="margin-right:8px;accent-color:var(--grn);">
                            <div class="bench-dot" style="background:#00e89d"></div>
                            <div class="bench-nm">WCA</div>
                            <div class="bench-v">11650'</div>
                        </label>
                        <label class="bench-row" style="cursor:pointer;">
                            <input type="checkbox" checked onchange="STATE.benches[6].active=this.checked" style="margin-right:8px;accent-color:var(--grn);">
                            <div class="bench-dot" style="background:#a05533"></div>
                            <div class="bench-nm">WCD</div>
                            <div class="bench-v">12780'</div>
                        </label>
                    </div>
                </div>
                <button class="btn-gen" onclick="generateWells()">Generate All Wells</button>
                <div id="wellList" style="margin-top:8px;max-height:300px;overflow-y:auto;"></div>
            </div>
        </div>
    `;
}
