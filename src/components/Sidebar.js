// components/Sidebar.js - EXACT v2 HTML structure

import { createViewToggle, initViewToggle } from './ViewToggle.js';
import { createLeaseInfoSection } from './LeaseInfoTab.js';
import { createDirectionalSection } from './DirectionalTab.js';
import { createPadDesignSection } from './PadDesignTab.js';
import { createTargetsSection } from './TargetsTab.js';
import { createStatsFooter } from './StatsFooter.js';

export function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.className = 'sb';
    sidebar.innerHTML = `
        <div class="sb-head">
            <div class="sb-logo">FG</div>
            <div><span class="sb-title">FGE Planner</span><span class="sb-ver">v3.1</span></div>
        </div>

        ${createViewToggle()}

        <div class="sb-scroll">
            ${createLeaseInfoSection()}
            ${createDirectionalSection()}
            ${createPadDesignSection()}
            ${createTargetsSection()}
        </div>

        ${createStatsFooter()}
    `;

    document.body.appendChild(sidebar);
    initViewToggle();
    
    // Add toggleTab to window
    window.toggleTab = function(id) {
        document.getElementById(id).classList.toggle('open');
    };
}
