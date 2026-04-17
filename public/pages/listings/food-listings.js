import { getListingData } from "../../scripts/query_listings.js";
import { navigateTo, delayedNavigateTo, Routes } from "../../scripts/router.js";
import { renderListingsPage } from "./listing-page.js";

export async function renderFoodListings() {
    const foodlistings = await getListingData("food_listing", 10, 0);

    renderListingsPage({
        title: "Food Listings",
        listings: foodlistings,
        pageIndex: 0,
        totalPages: 3,
        onCardClick: (id) => delayedNavigateTo(Routes.PostDetails, foodlistings.find(l => l.id == id)),
        onAddButtonClick: () => delayedNavigateTo(Routes.CreatePostWizard, false),
        onSwipeLeft: () => navigateTo(Routes.AssistantListing),
        onSwipeRight: () => navigateTo(Routes.SelectCollection)
    });
}