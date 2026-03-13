import { createPostCard } from "../components/cards/post-card.js";
import { createAddButton } from "../components/footer-bar/add-button.js";
import { createPageIndicator } from "../components/footer-bar/page-indicator.js";
import { setSwipePages } from "../components/swipe-detection.js";
import { navigate, routes } from "../scripts/router.js";
import { createHeaderBar } from "../components/header-bar/header-bar.js";

const listings = [
    {
        id: 1,
        name: "Pasta",
        desc: "I forgot pasta!",
        tag: "Wanted",
        user: "Sarah M",
        initials: "SM",
        time: "2 hours ago",
        image: "https://picsum.photos/400/200?3"
    },
    {
        id: 2,
        name: "Sourdough Loaf",
        desc: "Cant find any in the shops!",
        tag: "Wanted",
        user: "James R",
        initials: "JR",
        time: "4 hours ago",
        image: "https://picsum.photos/400/200?3"
    },
    {
        id: 3,
        name: "Vegetable Curry",
        desc: "I want to try some!",
        tag: "Wanted",
        user: "Priya K",
        initials: "PK",
        time: "Yesterday",
        image: "https://picsum.photos/400/200?3"
    }
];

export function renderAssistantListings() {
    document.getElementById("top-bar").innerHTML = createHeaderBar("Assistant Listings", true, true);

    document.getElementById("app").innerHTML = listings.map(item => createPostCard(item)).join("");

    document.getElementById("bottom-bar").innerHTML = `
        <div class="bottom-bar__inner">
            ${createPageIndicator(4, 1)}
            ${createAddButton()}
        </div>
    `;

    setSwipePages(
        () => navigate(routes.SelectInventory), 
        () => navigate(routes.FoodListing)
    );
}