import { detectSwipe, navigateTo, Routes } from "./scripts/router.js";

// go to default page
navigateTo(Routes.FoodListing);

detectSwipe(document.getElementById("app"));