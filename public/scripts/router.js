import { renderAssistantListings } from "../pages/assistant-listings.js";
import { renderFoodListings } from "../pages/food-listings.js";
import { renderInventories } from "../pages/inventories.js";
import { renderMealPreparing } from "../pages/meal-preparing.js";

export const routes = {
    FoodListing: renderFoodListings,
    AssistantListing: renderAssistantListings,
    SelectInventory: renderInventories,
    MealPreparing: renderMealPreparing,
};

export function navigate(page, data = {}) {
    page(data)
}