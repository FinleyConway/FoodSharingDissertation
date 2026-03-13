import { renderAssistantListings } from "../pages/assistant-listings.js";
import { renderFoodListings } from "../pages/food-listings.js";
import { renderInventories } from "../pages/inventories.js";
import { renderMealPreparing } from "../pages/meal-preparing.js";

let onLeftHandler = null;
let onRightHandler = null;

export const Routes = {
    FoodListing: renderFoodListings,
    AssistantListing: renderAssistantListings,
    SelectInventory: renderInventories,
    MealPreparing: renderMealPreparing,
};

export function navigateTo(page, data = {}) {
    document.getElementById("app").onclick = null; // prevent UB when switching pages
    page(data);
}

export function setSwipeRoutesTo(onLeft, onRight) {
    onLeftHandler = onLeft;
    onRightHandler = onRight;
}

export function detectSwipe(element) {
    let startX = 0;
    let startY = 0;

    element.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    element.addEventListener("touchend", (e) => {
        const dx = startX - e.changedTouches[0].clientX;
        const dy = startY - e.changedTouches[0].clientY;

        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;

        if (dx > 0 && onLeftHandler) onLeftHandler();
        else if (dx < 0 && onRightHandler) onRightHandler();
    });
}