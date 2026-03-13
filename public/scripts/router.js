import { renderFoodListings } from "../pages/food-listings.js";

export const routes = {
    FoodListing: renderFoodListings
};

export function navigate(page, data = {}) {
    page(data)
}