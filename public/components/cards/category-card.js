export function createCategoryCard(category) {
    return `
        <div class="category-card pressable" data-id="${category.id}">
            <div class="category-card__body">
                <h3 class="category-card__name">${category.name}</h3>
                <p class="category-card__desc">${category.desc}</p>
            </div>
            <span class="post-tag">${category.type}</span>
        </div>
    `;
}
export function onClickCategoryCard(onClick) {
    const app = document.getElementById("app");

    app.onclick = (e) => {
        const card = e.target.closest(".category-card");
        if (!card) return;

        onClick(card.dataset.id);
    };
}