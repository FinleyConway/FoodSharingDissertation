import { createAddButton } from "../components/footer-bar/add-button.js";
import { createCategoryCard } from "../components/cards/category-card.js";
import { createHeaderBar } from "../components/header-bar/header-bar.js";
import { createPageIndicator } from "../components/footer-bar/page-indicator.js";
import { navigateTo, Routes, setSwipeRoutesTo } from "../scripts/router.js";

const inventories = [
  { id: 1, name: "My fridge", desc: "General food items at home" },
  { id: 2, name: "Chinese", desc: "Shopping list idea" }
];

export function renderInventories() {
    document.getElementById("top-bar").innerHTML = createHeaderBar("Inventories", true);

    document.getElementById("app").innerHTML = inventories.map(item => createCategoryCard(item)).join("");

    document.getElementById("bottom-bar").innerHTML = `
        <div class="bottom-bar__inner">
            ${createPageIndicator(4, 2)}
            ${createAddButton()}
        </div>
    `;

    setSwipeRoutesTo(
        () => navigateTo(Routes.MealPreparing), 
        () => navigateTo(Routes.AssistantListing)
    );
}