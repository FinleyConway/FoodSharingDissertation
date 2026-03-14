import { createBackButton } from "./back-button.js";
import { createPageTitle } from "./page-title.js";
import { createSearchBar } from "./search-bar.js";

export function createHeaderBar(title, containSearch, hasFilter = false, hasBack = false) {
    return `
        <div class="top-bar__inner">
            <div class="top-bar__nav">
                ${hasBack ? createBackButton() : '<div style="width: 36px;"></div>'}
                ${createPageTitle(title)}
                <div></div>
            </div>
                ${containSearch ? `
                <div class="top-bar__search">
                    ${createSearchBar(hasFilter)}
                </div>
                ` : ''}
        </div>
    `;
}

export function onClickBack(onClick) {
    const btn = document.querySelector('[data-action="back"]');
    if (btn) btn.onclick = onClick;
}