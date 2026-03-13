import { createPostCard, onClickPostCard } from "../components/cards/post-card.js";
import { createAddButton } from "../components/footer-bar/add-button.js";
import { createPageIndicator } from "../components/footer-bar/page-indicator.js";
import { navigateTo, Routes, setSwipeRoutesTo } from "../scripts/router.js";
import { createHeaderBar } from "../components/header-bar/header-bar.js";

const listings = [
  {
    id: 1,
    name: "Homemade Pasta",
    desc: "Fresh tagliatelle, serves 2. Made this morning with free-range eggs.",
    tag: "Free",
    user: "Sarah M",
    initials: "SM",
    time: "2 hours ago",
    image: "https://picsum.photos/400/200?3"
  },
  {
    id: 2,
    name: "Sourdough Loaf",
    desc: "Whole loaf baked fresh today. Rosemary and sea salt. Best eaten within 2 days.",
    tag: "Trade",
    user: "James R",
    initials: "JR",
    time: "4 hours ago",
    image: "https://picsum.photos/400/200?3"
  },
  {
    id: 3,
    name: "Vegetable Curry",
    desc: "Big pot of veggie curry, enough for 4 portions. Mild spice. Chickpea and sweet potato base.",
    tag: "Swap",
    user: "Priya K",
    initials: "PK",
    time: "Yesterday",
    image: "https://picsum.photos/400/200?3"
  }
];

export function renderFoodListings() {
    document.getElementById("top-bar").innerHTML = createHeaderBar("Food Listings", true, true);

    document.getElementById("app").innerHTML =
        listings.map(item => createPostCard(item)).join("");

    onClickPostCard((id) => {
      navigateTo(Routes.SelectInventory);
    });

    document.getElementById("bottom-bar").innerHTML = `
        <div class="bottom-bar__inner">
            ${createPageIndicator(4, 0)}
            ${createAddButton()}
        </div>
    `;

    setSwipeRoutesTo(
      () => navigateTo(Routes.AssistantListing), 
      () => navigateTo(Routes.MealPreparing)
    );
}