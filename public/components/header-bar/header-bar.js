import { createPageTitle } from "./page-title.js";
import { createSearchBar } from "./search-bar.js";

export function createHeaderBar(title, containSearch, hasFilter=false) {
  return `
    <div class="top-bar__inner">
      ${createPageTitle(title)}
      ${containSearch ? `
        <div class="top-bar__search">
          ${createSearchBar(hasFilter)}
        </div>
      ` : ''}
    </div>
  `;
}