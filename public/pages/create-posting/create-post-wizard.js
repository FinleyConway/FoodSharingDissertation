import { setHtml } from "../../scripts/dom.js";
import { createHeaderBar, onClickBack } from "../../components/header-bar/header-bar.js";
import { delayedNavigateTo, navigateBack, Routes } from "../../scripts/router.js";
import { createWizardCard, onClickWizardCard } from "../../components/wizard/wizard-button.js";

export function renderCreatePostWizard() {
    setHtml("top-bar", createHeaderBar("Create Post", false, false, true));
    onClickBack(() => navigateBack());

    setHtml("app", `
        <div class="wizard">
            ${createWizardCard("barcode", "📷", "Scan Barcode", "Automatically lookup product details using your camera")}
            ${createWizardCard("manual", "✏️", "Manual Entry", "Homemade food or no barcode? Enter the details yourself")}
        </div>
    `);
    onClickWizardCard((action) => {
        //if (action === "barcode") navigateTo(Routes.BarcodeScanner);
        if (action === "manual") delayedNavigateTo(Routes.CreatePostManual);
    });

    setHtml("bottom-bar", "");
    setSwipeRoutesTo(null, null);
}