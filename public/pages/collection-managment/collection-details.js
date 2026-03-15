import { createCollectionItemCard, onClickCollectionItemCard } from "../../components/cards/collection-item-card.js";
import { createAddButton, onClickAddButton } from "../../components/footer-bar/add-button.js";
import { createHeaderBar, onClickBack } from "../../components/header-bar/header-bar.js";
import { setHtml } from "../../scripts/dom.js";
import { navigateBack, navigateTo, Routes, setSwipeRoutesTo } from "../../scripts/router.js";

let collectionItems = [];

function renderContent(collection) {
    const outOfStock = collectionItems.filter(i => i.quantity === 0);
    const inStock = collectionItems.filter(i => i.quantity > 0);

    const isMealPrep = collection.type === "mealprep";

    setHtml("app", `
        <div class="collection-detail">
            ${isMealPrep ? `
                <div class="collection-detail__info">
                <p class="collection-detail__desc">${collection.desc}</p>
                <div class="collection-detail__how-to">
                    <p class="form-label">How to make</p>
                    <p class="collection-detail__steps">${collection.howToMake}</p>
                </div>
                </div>
            ` : ''}

            <div class="collection-detail__items">
                ${isMealPrep ? `<p class="form-label">Ingredients</p>` : ''}
                ${createCollectionItemCard(inStock, outOfStock)}
            </div>
        </div>
    `);

    onClickCollectionItemCard(
        (inc, dec) => {
            const id = parseInt((inc || dec).dataset.id);
            const item = collectionItems.find(i => i.id === id);
            if (inc) item.quantity++;
            if (dec && item.quantity > 0) item.quantity--;
            renderContent(collection);
        },
        (id) => navigateTo(Routes.PostDetails, collectionItems.find(i => i.id == id))
    );
}

export function renderCollectionDetail(collection) {
    collectionItems = [...collection.items];

    setHtml("top-bar", createHeaderBar(collection.name, false, false, true));
    onClickBack(() => navigateBack());

    renderContent(collection);

    setHtml("bottom-bar", `
        <div class="bottom-bar__inner">
            ${createAddButton()}
        </div>
    `);

    onClickAddButton(() => navigateTo(Routes.CreatePostWizard));
    setSwipeRoutesTo(null, null);
}