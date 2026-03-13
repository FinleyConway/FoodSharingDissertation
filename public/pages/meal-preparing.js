import { createAddButton } from "../components/footer-bar/add-button.js";
import { createCategoryCard } from "../components/cards/category-card.js";
import { createHeaderBar } from "../components/header-bar/header-bar.js";
import { createPageIndicator } from "../components/footer-bar/page-indicator.js";
import { setSwipePages } from "../components/swipe-detection.js";
import { navigate, routes } from "../scripts/router.js";

const mealPreperation = [
  { id: 1, name: "Very spicy chilli", desc: "Some diabolical meal" },
  { id: 2, name: "Chinese", desc: "I craved it" }
];

export function renderMealPreparing() {
    document.getElementById("top-bar").innerHTML = createHeaderBar("Meal Preparing", true);

    document.getElementById("app").innerHTML = mealPreperation.map(item => createCategoryCard(item)).join("");

    document.getElementById("bottom-bar").innerHTML = `
        <div class="bottom-bar__inner">
            ${createPageIndicator(4, 3)}
            ${createAddButton()}
        </div>
    `;

    setSwipePages(
        () => navigate(routes.FoodListing), 
        () => navigate(routes.SelectInventory)
    );
}