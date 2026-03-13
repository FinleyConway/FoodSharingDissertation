export function createSearchBar(hasFilter) {
    return `
        <input type="text" class="search" placeholder="Search"/>
        ${hasFilter ? `<button class="filter-btn">⚙</button>` : ''}
    `;
}