import { getListingData } from "../../scripts/query_listings.js";
import { navigateTo, delayedNavigateTo, Routes } from "../../scripts/router.js";
import { renderListingsPage } from "./listing-page.js";

export async function renderAssistantListings() {
    const assistantListings = await getListingData("assistant_listing", 10, 0);

    renderListingsPage({
        title: "Assistant Listings",
        listings: assistantListings,
        pageIndex: 1,
        totalPages: 3,
        onCardClick: (id) => delayedNavigateTo(Routes.PostDetails, assistantListings.find(l => l.id == id)),
        onAddButtonClick: () => delayedNavigateTo(Routes.CreatePostWizard, true),
        onSwipeLeft: () => navigateTo(Routes.SelectCollection),
        onSwipeRight: () => navigateTo(Routes.FoodListing)
    });
}