import { renderAssistantListings } from "../pages/listings/assistant-listings.js";
import { renderFoodListings } from "../pages/listings/food-listings.js";
import { renderInventories } from "../pages/inventories.js";
import { renderMealPreparing } from "../pages/meal-preparing.js";
import { renderPostDetail } from "../pages/post-details.js"
import { renderCreatePostWizard } from "../pages/create-posting/create-post-wizard.js";
import { renderCreatePostManual } from "../pages/create-posting/create-post-manual.js";

let onLeftHandler = null;
let onRightHandler = null;
let currentRoute = null;
let routeStack = [];

export const Routes = {
    FoodListing: renderFoodListings,
    AssistantListing: renderAssistantListings,
    SelectInventory: renderInventories,
    MealPreparing: renderMealPreparing,
    PostDetails: renderPostDetail,
    CreatePostWizard: renderCreatePostWizard,
    CreatePostManual: renderCreatePostManual,
};

export function navigateTo(page, data = {}) {
    document.getElementById("top-bar").onclick = null;
    document.getElementById("app").onclick = null; // prevent UB when switching pages
    document.getElementById("bottom-bar").onclick = null; // this feels very hacky ngl

    page(data); 

    routeStack.push({ page, data });
    currentRoute = page;
}

export function delayedNavigateTo(page, data = {}, delay = 150) {
    setTimeout(() => navigateTo(page, data), delay);
}

export function navigateBack() {
    if (routeStack.length <= 1) return; // nothing to go back to

    routeStack.pop(); // remove current page
    const { page, data } = routeStack[routeStack.length - 1]; // peek at previous

    document.getElementById("top-bar").onclick = null;
    document.getElementById("app").onclick = null;
    document.getElementById("bottom-bar").onclick = null;

    page(data); // re-render previous page
    currentRoute = page;
}

export function navigateToTop() {
    if (routeStack.length === 0) return;

    const { page, data } = routeStack[0]; // get the first page

    routeStack.length = 0; // clear the stack
    routeStack.push({ page, data }); // push root back so stack isn't empty

    document.getElementById("top-bar").onclick = null;
    document.getElementById("app").onclick = null;
    document.getElementById("bottom-bar").onclick = null;

    page(data);
    currentRoute = page;
}

export function delayedNavigateToTop(delay = 150) {
    setTimeout(() => navigateToTop(), delay);
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