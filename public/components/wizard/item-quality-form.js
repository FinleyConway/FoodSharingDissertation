export function createItemQualityForm(prefilled = {}) {
    return `
        <div class="form-section">
            <div class="form-field">
                <label class="form-label">Expiry Date</label>
                <input class="form-input" type="date" id="input-expiry" value="" />
            </div>
            <div class="form-field">
                <label class="form-label">Ingredients</label>
                <textarea class="form-input form-textarea" placeholder="e.g. flour, eggs, milk" id="input-ingredients">${prefilled.ingredients ?? ''}</textarea>
            </div>
            <div class="form-field">
                <label class="form-label">Quality Rating</label>
                <select class="form-input" id="input-quality">
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                </select>
            </div>
        </div>
    `;
}

export function createSubmitButton() {
    return `
        <button class="request-btn pressable" data-action="submit">Post Listing</button>
    `;
}

export function validateListing(results, image) {
    const errors = [];

    if (!image) errors.push("Please add an image.");
    if (!results.name.trim()) errors.push("Food name is required.");
    if (!results.desc.trim()) errors.push("Description is required.");
    if (!results.ingredients.trim()) errors.push("Ingredients are required.");

    if (!results.expiry) {
        errors.push("Expiry date is required.");
    } 
    else {
        // prevent out of date product listings
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const expiry = new Date(results.expiry);
        if (expiry < today) errors.push("Expiry date cannot be in the past.");
    }

    return errors;
}

export function showFormErrors(errors) {
    const existing = document.getElementById("form-errors");
    if (existing) existing.remove();

    const el = document.createElement("div");
    el.id = "form-errors";
    el.className = "form-errors";
    el.innerHTML = errors.map(e => `<p class="form-error">⚠ ${e}</p>`).join("");

    const bottomBar = document.getElementById("bottom-bar");
    bottomBar.insertBefore(el, bottomBar.firstChild);
}

export function onClickSubmitButton(onClick) {
    const bottom = document.getElementById("bottom-bar");

    bottom.onclick = (e) => {
        const btn = e.target.closest(".request-btn");
        if (!btn) return;

        const results = {
            name: document.getElementById("input-name").value,
            desc: document.getElementById("input-desc").value,
            expiry: document.getElementById("input-expiry").value,
            ingredients: document.getElementById("input-ingredients").value,
            quality: document.getElementById("input-quality").value,
        };

        onClick(results);
    };
}