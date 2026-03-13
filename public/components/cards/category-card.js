export function createCategoryCard(category) {
    return `
        <div class="category-card">
        <h3 class="category-card__name">${category.name}</h3>
        <p class="category-card__desc">${category.desc}</p>
        </div>
    `;
}