import { navigateTo, delayedNavigateTo, Routes } from "../../scripts/router.js";
import { renderListingsPage } from "./listing-page.js";

const assistantListings = [
    {
        id: 1,
        name: "Sourdough Bread",
        desc: "Does anyone have a spare sourdough loaf? Forgot to grab one at the shops!",
        meetingInstructions: "Meet at the front door. Available between 5pm - 7pm.",
        tag: "Wanted",
        user: "James R",
        initials: "JR",
        time: "1 hour ago",
        image: "https://picsum.photos/400/200?1"
    }
];

export function renderAssistantListings() {
    renderListingsPage({
        title: "Assistant Listings",
        listings: assistantListings,
        pageIndex: 1,
        totalPages: 4,
        onCardClick: (id) => delayedNavigateTo(Routes.PostDetails, assistantListings.find(l => l.id == id)),
        onAddButtonClick: () => delayedNavigateTo(Routes.CreatePostWizard),
        onSwipeLeft: () => navigateTo(Routes.SelectInventory),
        onSwipeRight: () => navigateTo(Routes.FoodListing)
    });
}