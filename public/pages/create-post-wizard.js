import { setHtml } from "../../scripts/dom.js";
import { createHeaderBar, onClickBack } from "../../components/header-bar/header-bar.js";
import { getPreviousRoute, navigateTo, Routes } from "../../scripts/router.js";
import { createWizardCard, onClickWizardCard } from "../components/wizard-button.js";

export function renderCreatePostWizard() {
    setHtml("top-bar", createHeaderBar("Create Post", false, false, true));
    onClickBack(() => navigateTo(getPreviousRoute()));

    setHtml("app", `
        <div class="wizard">
            ${createWizardCard("barcode", "📷", "Scan Barcode", "Automatically lookup product details using your camera")}
            ${createWizardCard("manual", "✏️", "Manual Entry", "Homemade food or no barcode? Enter the details yourself")}
        </div>
    `);
    onClickWizardCard((action) => {
        //if (action === "barcode") navigateTo(Routes.BarcodeScanner);
        //if (action === "manual") navigateTo(Routes.CreatePostManual);
    });

    setHtml("bottom-bar", "");
}