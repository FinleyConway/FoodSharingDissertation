import { renderAssistantListings } from "../pages/listings/assistant-listings.js";
import { renderFoodListings } from "../pages/listings/food-listings.js";
import { renderInventories } from "../pages/inventories.js";
import { renderMealPreparing } from "../pages/meal-preparing.js";
import { renderPostDetail } from "../pages/post-details.js"

let onLeftHandler = null;
let onRightHandler = null;
let current_route = null;
let previous_route = null;

export const Routes = {
    FoodListing: renderFoodListings,
    AssistantListing: renderAssistantListings,
    SelectInventory: renderInventories,
    MealPreparing: renderMealPreparing,
    PostDetails: renderPostDetail,
};

export function navigateTo(page, data = {}) {
    document.getElementById("app").onclick = null; // prevent UB when switching pages
    page(data);
    previous_route = current_route;
    current_route = page;
}

export function getCurrentRoute() {
    return current_route;
}

export function getPreviousRoute() {
    return previous_route;
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