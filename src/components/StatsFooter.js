// components/StatsFooter.js - EXACT v2 HTML structure

export function createStatsFooter() {
    return `
        <div class="stats">
            <div class="stat"><div class="stat-v" id="stWells">0</div><div class="stat-l">Wells</div></div>
            <div class="stat"><div class="stat-v" id="stPads">0</div><div class="stat-l">Pads</div></div>
            <div class="stat"><div class="stat-v" id="stLat">—</div><div class="stat-l">Avg Lateral</div></div>
            <div class="stat"><div class="stat-v" id="stTgt">0</div><div class="stat-l">Targets</div></div>
        </div>
    `;
}
