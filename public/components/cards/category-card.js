export function createCategoryCard(category) {
    return `
        <div class="category-card pressable" data-id="${category.id}">
            <h3 class="category-card__name">${category.name}</h3>
            <p class="category-card__desc">${category.desc}</p>
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