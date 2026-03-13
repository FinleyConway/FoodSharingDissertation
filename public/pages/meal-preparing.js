import { createAddButton } from "../components/footer-bar/add-button.js";
import { createCategoryCard, onClickCategoryCard } from "../components/cards/category-card.js";
import { createHeaderBar } from "../components/header-bar/header-bar.js";
import { createPageIndicator } from "../components/footer-bar/page-indicator.js";
import { navigateTo, Routes, setSwipeRoutesTo } from "../scripts/router.js";
import { setHtml } from "../scripts/dom.js";

const mealPreperation = [
  { id: 1, name: "Very spicy chilli", desc: "Some diabolical meal" },
  { id: 2, name: "Chinese", desc: "I craved it" }
];

export function renderMealPreparing() {
    // create top bar
    setHtml("top-bar", createHeaderBar("Meal Preparing", true));

    // create main
    setHtml("app", mealPreperation.map(item => createCategoryCard(item)).join(""));
    onClickCategoryCard((id) => {
        console.log(id);
    })

    // create bottom bar
    setHtml("bottom-bar", `
        <div class="bottom-bar__inner">
            ${createPageIndicator(4, 3)}
            ${createAddButton()}
        </div>
    `);

    // allow to swipe to food listing and select inventory page
    setSwipeRoutesTo(
        () => navigateTo(Routes.FoodListing), 
        () => navigateTo(Routes.SelectInventory)
    );
}