import { setHtml } from "../../scripts/dom.js";
import { createHeaderBar, onClickBack } from "../../components/header-bar/header-bar.js";
import { delayedNavigateToTop, navigateBack, setSwipeRoutesTo } from "../../scripts/router.js";
import { createImagePicker, openImagePicker } from "../../components/wizard/image-picker.js";
import { showFormErrors } from "../../components/wizard/item-quality-form.js";
import { createSubmitButton, onClickSubmitItemButton, validateItem } from "./create-item-form.js";
import { createCollectionItem } from "../../scripts/create-collection-item.js";


export function renderCreateItemManual(collectionId, prefilled = {}) {    
    let selectedImage = null;

    setHtml("top-bar", createHeaderBar("Manual Create Item", false, false, true));
    onClickBack(() => navigateBack());
    
    setHtml("app", `
        <div class="create-post-form">
            ${createImagePicker(prefilled.image_url ?? "")}
            <input class="form-input" type="text" placeholder="Food name" value="${prefilled.name ?? ''}" id="input-name" />
            <textarea class="form-input form-textarea" placeholder="Description" id="input-desc"></textarea>
            <div class="form-field">
                <label class="form-label">Expiry Date</label>
                <input class="form-input" type="date" id="input-expiry" value="" />
            </div>
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
    onClickSubmitItemButton((results) => {
        const errors = validateItem(results, selectedImage ?? prefilled.image_url);

        if (errors.length > 0) {
            showFormErrors(errors);
            return; // dont submit
        }

        const item = {
            collection_id: collectionId,
            ...results,
            image_path: "https://picsum.photos/400/200?1" ?? prefilled.image_url
        };

        createCollectionItem(item);

        delayedNavigateToTop();
    });
    
    setSwipeRoutesTo(null, null);
}