import { createCategoryCard, onClickCategoryCard } from "../../components/cards/category-card.js";
import { createAddButton, onClickAddButton } from "../../components/footer-bar/add-button.js";
import { createPageIndicator } from "../../components/footer-bar/page-indicator.js";
import { createHeaderBar } from "../../components/header-bar/header-bar.js";
import { showCollectionModal } from "../../components/modals/collection-modal.js";
import { getUserId } from "../../scripts/current_user.js";
import { setHtml } from "../../scripts/dom.js";
import { getCollectionData } from "../../scripts/query_collection.js";
import { delayedNavigateTo, Routes, setSwipeRoutesTo } from "../../scripts/router.js";

export async function renderCollections() {
    const collections = await getCollectionData(getUserId());

    setHtml("top-bar", createHeaderBar("Collections", true, false));

    setHtml("app", `
        <div class="collection-feed">
            ${collections.map(c => createCategoryCard(c)).join("")}
        </div>
    `);

    onClickCategoryCard((id) => {
        const collection = collections.find(c => c.id == id);
        delayedNavigateTo(Routes.CollectionDetail, collection);
    });

    setHtml("bottom-bar", `
        <div class="bottom-bar__inner">
            ${createPageIndicator(3, 2)}
            ${createAddButton()}
        </div>
    `);

    onClickAddButton(() => {
        showCollectionModal();
    });
    setSwipeRoutesTo(Routes.FoodListing, Routes.AssistantListing);
}