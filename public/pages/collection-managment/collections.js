import { createCategoryCard, onClickCategoryCard } from "../../components/cards/category-card.js";
import { createAddButton, onClickAddButton } from "../../components/footer-bar/add-button.js";
import { createPageIndicator } from "../../components/footer-bar/page-indicator.js";
import { createHeaderBar } from "../../components/header-bar/header-bar.js";
import { showModal } from "../../components/model.js";
import { setHtml } from "../../scripts/dom.js";
import { navigateTo, Routes, setSwipeRoutesTo } from "../../scripts/router.js";

const collections = [
    {
        id: 1,
        type: "Inventory",
        name: "My Pantry",
        desc: "General food items at home",
        items: [
            { id: 1, name: "Pasta", desc: "Fusilli 500g", image: "https://picsum.photos/400/200?1", quantity: 3 },
            { id: 2, name: "Tinned Tomatoes", desc: "400g tin", image: "https://picsum.photos/400/200?2", quantity: 0 },
            { id: 3, name: "Basmati Rice", desc: "1kg bag", image: "https://picsum.photos/400/200?3", quantity: 1 },
            { id: 4, name: "Olive Oil", desc: "Extra virgin 500ml", image: "https://picsum.photos/400/200?4", quantity: 0 }
        ]
    },
    {
        id: 2,
        type: "Inventory",
        name: "DnD Fridge",
        desc: "For da boyzz",
        items: [
            { id: 1, name: "Milk", desc: "Semi skimmed 2L", image: "https://picsum.photos/400/200?5", quantity: 1 },
            { id: 2, name: "Butter", desc: "Salted 250g", image: "https://picsum.photos/400/200?6", quantity: 0 },
            { id: 3, name: "Orange Juice", desc: "1L carton", image: "https://picsum.photos/400/200?7", quantity: 2 }
        ]
    },
    {
        id: 3,
        type: "Meal",
        name: "Pasta Bolognese",
        desc: "A classic Italian meat sauce served over pasta.",
        howToMake: "Brown the mince in a pan, drain excess fat. Add diced onion and garlic and cook for 5 mins. Stir in tinned tomatoes and simmer for 20 mins. Cook pasta separately and combine.",
        items: [
            { id: 1, name: "Pasta", desc: "Fusilli 500g", image: "https://picsum.photos/400/200?1", quantity: 2 },
            { id: 2, name: "Tinned Tomatoes", desc: "400g tin", image: "https://picsum.photos/400/200?2", quantity: 0 },
            { id: 3, name: "Beef Mince", desc: "500g", image: "https://picsum.photos/400/200?3", quantity: 1 },
            { id: 4, name: "Garlic", desc: "3 cloves", image: "https://picsum.photos/400/200?8", quantity: 0 }
        ]
    },
    {
        id: 4,
        type: "Meal",
        name: "Veggie Stir Fry",
        desc: "A quick and healthy weeknight dinner packed with vegetables.",
        howToMake: "Heat oil in a wok on high heat. Add vegetables and stir fry for 5 mins. Add soy sauce and sesame oil, toss and serve over rice.",
        items: [
            { id: 1, name: "Basmati Rice", desc: "1kg bag", image: "https://picsum.photos/400/200?3", quantity: 1 },
            { id: 2, name: "Soy Sauce", desc: "150ml bottle", image: "https://picsum.photos/400/200?9", quantity: 0 },
            { id: 3, name: "Mixed Vegetables", desc: "Frozen 500g bag", image: "https://picsum.photos/400/200?10", quantity: 2 }
        ]
    }
];

export function renderCollections() {
    setHtml("top-bar", createHeaderBar("Collections", true, false));

    setHtml("app", `
        <div class="collection-feed">
            ${collections.map(c => createCategoryCard(c)).join("")}
        </div>
    `);

    onClickCategoryCard((id) => {
        const collection = collections.find(c => c.id == id);
        navigateTo(Routes.CollectionDetail, collection);
    });

    setHtml("bottom-bar", `
        <div class="bottom-bar__inner">
            ${createPageIndicator(3, 2)}
            ${createAddButton()}
        </div>
    `);

    onClickAddButton(() => {
        showModal({
            title: "New Collection",
            fields: [
                { key: "name", label: "Name", placeholder: "e.g. My Pantry" },
                { key: "desc", label: "Description", placeholder: "e.g. General food items", multiline: true }
            ],
            onSubmit: (result) => {
                console.log("new collection:", result);
                // add to collections array and re-render
            }
        });
    });
    setSwipeRoutesTo(Routes.FoodListing, Routes.AssistantListing);
}