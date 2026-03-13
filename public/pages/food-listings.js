import { createSearchPost } from "../components/search-post.js";
import { createPostCard } from "../components/post-card.js";
import { createAddButton } from "../components/add-button.js";

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
    document.getElementById("top-bar").innerHTML = createSearchPost()
    document.getElementById("app").innerHTML = listings.map(item => createPostCard(item)).join("");
    document.getElementById("bottom-bar").innerHTML = createAddButton()
}