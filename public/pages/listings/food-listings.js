import { navigateTo, delayedNavigateTo, Routes } from "../../scripts/router.js";
import { renderListingsPage } from "./listing-page.js";

const foodlistings = [
    {
        id: 1,
        tag: "Trade",
        name: "Homemade Pasta",
        desc: "Fresh tagliatelle, serves 2. Made this morning with free-range eggs.",
        meetingInstructions: "Meet at the front door. Available between 5pm - 7pm.",
        context:
            {
                expires: "14/03/2026",
                ingredients: [
                    "milk",
                    "egg"
                ],
                quality: "Good"
            },
        user: "Sarah M",
        time: "2 hours ago",
        image: "https://picsum.photos/400/200?3"
    }
];

export function renderFoodListings() {
    renderListingsPage({
        title: "Food Listings",
        listings: foodlistings,
        pageIndex: 0,
        totalPages: 3,
        onCardClick: (id) => delayedNavigateTo(Routes.PostDetails, foodlistings.find(l => l.id == id)),
        onAddButtonClick: () => delayedNavigateTo(Routes.CreatePostWizard),
        onSwipeLeft: () => navigateTo(Routes.AssistantListing),
        onSwipeRight: () => navigateTo(Routes.SelectCollection)
    });
}