// components/PadDesignTab.js - EXACT v2 HTML structure

export function createPadDesignSection() {
    return `
        <div class="tab" id="tabPads">
            <div class="tab-hdr" onclick="toggleTab('tabPads')">
                <div class="tab-num">3</div>
                <div class="tab-label">Pad Design</div>
                <div class="tab-status empty">0 PADS</div>
                <span class="tab-chev">▸</span>
            </div>
            <div class="tab-body">
                <div class="field">
                    <div class="field-lbl">Pad Measurements (ft)</div>
                    <div class="field-row">
                        <input class="inp" id="padN" value="150" placeholder="N of SHL">
                        <input class="inp" id="padE" value="180" placeholder="E of SHL">
                        <input class="inp" id="padW" value="230" placeholder="W of SHL">
                        <input class="inp" id="padS" value="220" placeholder="S of SHL">
                    </div>
                </div>
                <div class="field">
                    <div class="field-lbl">Well Slot Spacing (ft)</div>
                    <input class="inp" id="slotSpacing" value="35" style="width:80px;">
                </div>
                <button class="btn-gen" onclick="autoPlacePads()">Auto-Place Pads</button>
                <div id="padList" style="margin-top:8px;"></div>
            </div>
        </div>
    `;
}
