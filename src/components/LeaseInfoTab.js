// components/LeaseInfoTab.js - EXACT v2 HTML structure

export function createLeaseInfoSection() {
    return `
        <div class="tab" id="tabLease">
            <div class="tab-hdr" onclick="toggleTab('tabLease')">
                <div class="tab-num">1</div>
                <div class="tab-label">Lease Information</div>
                <div class="tab-status ok">SET</div>
                <span class="tab-chev">▸</span>
            </div>
            <div class="tab-body">
                <div class="field">
                    <div class="field-lbl">AOI Corners (State Plane XY)</div>
                    <div class="corner-grid">
                        <div class="corner-lbl">NW</div>
                        <input class="inp" id="nwx" value="662189.242">
                        <input class="inp" id="nwy" value="474873.170">
                        
                        <div class="corner-lbl">NE</div>
                        <input class="inp" id="nex" value="667456.589">
                        <input class="inp" id="ney" value="474895.398">
                        
                        <div class="corner-lbl">SE</div>
                        <input class="inp" id="sex" value="667688.448">
                        <input class="inp" id="sey" value="461654.960">
                        
                        <div class="corner-lbl">SW</div>
                        <input class="inp" id="swx" value="662414.017">
                        <input class="inp" id="swy" value="461630.840">
                    </div>
                </div>
                
                <div class="field">
                    <div class="field-lbl">Regulatory Offsets (ft)</div>
                    <div class="field-row">
                        <input class="inp" id="fnl" value="330" placeholder="FNL">
                        <input class="inp" id="fwl" value="330" placeholder="FWL">
                        <input class="inp" id="fsl" value="330" placeholder="FSL">
                        <input class="inp" id="fel" value="330" placeholder="FEL">
                    </div>
                </div>
                
                <div class="field">
                    <div class="field-lbl">Elevation (ft)</div>
                    <input class="inp" id="elev" value="3400" style="width:120px;">
                </div>
                
                <div class="field">
                    <div class="field-lbl">Bench Tops (TVDSS → TVD auto-computed)</div>
                    <div id="benchInputs">
                        <div class="bench-row">
                            <div class="bench-dot" style="background:#c4993d"></div>
                            <div class="bench-nm">AVL</div>
                            <div class="bench-v">5358 → 8758'</div>
                        </div>
                        <div class="bench-row">
                            <div class="bench-dot" style="background:#886633"></div>
                            <div class="bench-nm">FBS</div>
                            <div class="bench-v">6000 → 9400'</div>
                        </div>
                        <div class="bench-row">
                            <div class="bench-dot" style="background:#5a8844"></div>
                            <div class="bench-nm">SBSU</div>
                            <div class="bench-v">6630 → 10030'</div>
                        </div>
                        <div class="bench-row">
                            <div class="bench-dot" style="background:#775522"></div>
                            <div class="bench-nm">SBSL</div>
                            <div class="bench-v">6900 → 10300'</div>
                        </div>
                        <div class="bench-row">
                            <div class="bench-dot" style="background:#b87741"></div>
                            <div class="bench-nm">TBS</div>
                            <div class="bench-v">8030 → 11430'</div>
                        </div>
                        <div class="bench-row">
                            <div class="bench-dot" style="background:#00e89d"></div>
                            <div class="bench-nm">WCA</div>
                            <div class="bench-v">8250 → 11650'</div>
                        </div>
                        <div class="bench-row">
                            <div class="bench-dot" style="background:#a05533"></div>
                            <div class="bench-nm">WCD</div>
                            <div class="bench-v">9380 → 12780'</div>
                        </div>
                    </div>
                </div>
                
                <div class="field">
                    <div class="field-lbl">Computed Lease Geometry</div>
                    <div id="leaseComputed" style="font:400 10px var(--mono);color:var(--tx2);">
                        N: 5267' @ 89.758°<br>
                        S: 5274' @ 89.730°<br>
                        W: 13244' @ 179.028°<br>
                        E: 13242' @ 178.997°<br>
                        Boundary: 4 corners computed
                    </div>
                </div>
            </div>
        </div>
    `;
}
