function createItemCard(item, isSuggestion = false) {
    return `
        <div class="collection-item-card ${isSuggestion ? 'collection-item-card--suggestion' : ''}"
            ${isSuggestion ? `data-action="view-listing" data-id="${item.id}"` : ''}>
            <img class="collection-item-card__img" src="${item.image}" alt="${item.name}" />
        <div class="collection-item-card__body">
            <p class="collection-item-card__name">${item.name}</p>
            <p class="collection-item-card__desc">${item.desc}</p>
        </div>
        <div class="collection-item-card__tally">
            <button class="tally-btn pressable" data-action="decrement" data-id="${item.id}">−</button>
            <span class="tally-count">${item.quantity}</span>
            <button class="tally-btn pressable" data-action="increment" data-id="${item.id}">+</button>
        </div>
            ${isSuggestion ? `
                <div class="collection-item-card__chevron">
                    <div class="chevron-right"></div>
                </div>
            ` : ''}
        </div>
    `;
}

export function createCollectionItemCard(inStock, outOfStock) {
    return `
        <div class="collection-detail">
            ${inStock.map(item => createItemCard(item)).join("")}
            ${outOfStock.length > 0 ? `
            <div class="collection-suggestions">
                <p class="collection-suggestions__label">Running low — find these nearby</p>
                ${outOfStock.map(item => createItemCard(item, true)).join("")}
            </div>
        ` : ''}
        </div>
    `;
}

export function onClickCollectionItemCard(onTally, onViewListing = null) {
    const app = document.getElementById("app");

    app.onclick = (e) => {
        const inc = e.target.closest("[data-action='increment']");
        const dec = e.target.closest("[data-action='decrement']");
        const listing = e.target.closest("[data-action='view-listing']");

        if (inc || dec) {
            e.stopPropagation(); // prevent tally click bubbling to the card
            onTally(inc, dec);
            return;
        }

        if (listing && onViewListing) onViewListing(listing.dataset.id);
    };
}