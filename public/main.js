import { detectSwipe } from "./components/swipe-detection.js";
import { navigate, routes } from "./scripts/router.js";

// go to default page
navigate(routes.FoodListing);

// enable swiping
detectSwipe(document.getElementById('app'));