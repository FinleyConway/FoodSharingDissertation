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
  page(data);
}

export function setSwipeRoutesTo(onLeft, onRight) {
    onLeftHandler = onLeft;
    onRightHandler = onRight;
}

export function detectSwipe(element) {
    let startX = 0;

    element.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    element.addEventListener('touchend', (e) => {
        const diff = startX - e.changedTouches[0].clientX;

        if (Math.abs(diff) < 50) return; // ignore small movements

        if (diff > 0 && onLeftHandler != null) {
            onLeftHandler();   // swiped left  → next page
        }
        else if (diff < 0 && onRightHandler != null) {
            onRightHandler();  // swiped right → prev page
        }
    });
}