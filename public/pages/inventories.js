import { createAddButton } from "../components/footer-bar/add-button.js";
import { createCategoryCard, onClickCategoryCard } from "../components/cards/category-card.js";
import { createHeaderBar } from "../components/header-bar/header-bar.js";
import { createPageIndicator } from "../components/footer-bar/page-indicator.js";
import { navigateTo, delayedNavigateTo, Routes, setSwipeRoutesTo } from "../scripts/router.js";
import { setHtml } from "../scripts/dom.js";

const inventories = [
  { id: 1, name: "My fridge", desc: "General food items at home" },
  { id: 2, name: "Chinese", desc: "Shopping list idea" }
];

export function renderInventories() {
    // create top bar
    setHtml("top-bar", createHeaderBar("Inventories", true));

    // create main
    setHtml("app", inventories.map(item => createCategoryCard(item)).join(""));
    onClickCategoryCard((id) => {
        console.log(id);
    })

    // create bottom bar
    setHtml("bottom-bar", `
        <div class="bottom-bar__inner">
            ${createPageIndicator(4, 2)}
            ${createAddButton()}
        </div>
    `);

    // allow to swipe to assistant listing and meal prep page
    setSwipeRoutesTo(
        () => navigateTo(Routes.MealPreparing), 
        () => navigateTo(Routes.AssistantListing)
    );
}