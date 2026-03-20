import { setHtml } from "../../scripts/dom.js";
import { createHeaderBar, onClickBack } from "../../components/header-bar/header-bar.js";
import { delayedNavigateToTop, navigateBack, setSwipeRoutesTo } from "../../scripts/router.js";
import { createImagePicker, openImagePicker } from "../../components/wizard/image-picker.js";
import { createItemQualityForm, createSubmitButton, onClickSubmitButton, showFormErrors, validateListing } from "../../components/wizard/item-quality-form.js";

export function renderCreatePostManual({ isWanted, prefilled = {} }) {    
    let selectedImage = null;

    setHtml("top-bar", createHeaderBar("Manual Create Post", false, false, true));
    onClickBack(() => navigateBack());
    
    setHtml("app", `
        <div class="create-post-form">
            ${createImagePicker(prefilled.image_url ?? "")}
            <input class="form-input" type="text" placeholder="Food name" value="${prefilled.name ?? ''}" id="input-name" />
            <textarea class="form-input form-textarea" placeholder="Description" id="input-desc"></textarea>
            ${!isWanted ? createItemQualityForm(prefilled) : ''}
        </div>
    `);
    openImagePicker((file) => {
        selectedImage = file;
    });

    setHtml("bottom-bar", `
        <div class="bottom-bar__inner">
            ${createSubmitButton()}
        </div>
    `);
    onClickSubmitButton((results) => {
        const errors = validateListing(results, selectedImage ?? prefilled.image_url);

        if (errors.length > 0) {
            showFormErrors(errors);
            return; // dont submit
        }

        const listing = {
            ...results,
            image: selectedImage ?? prefilled.image_url
        };

        // give it to api in future
        console.log("Listings: ", listing);

        delayedNavigateToTop();
    });
    
    setSwipeRoutesTo(null, null);
}