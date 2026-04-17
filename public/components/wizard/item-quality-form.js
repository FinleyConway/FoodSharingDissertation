export function createItemQualityForm(prefilled = {}) {
    return `
        <div class="form-section">
            <div class="form-field">
                <label class="form-label">Tag</label>
                <select class="form-input" id="input-tag">
                    <option value="Free">Free</option>
                    <option value="Trade">Trade</option>
                </select>
            </div>
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

export function validateListing(isWanted, results, image) {
    const errors = [];

    if (!image) errors.push("Please add an image.");
    if (!results.name.trim()) errors.push("Food name is required.");
    if (!isWanted && !results.tag.trim()) errors.push("Tag is required.");
    if (!results.description.trim()) errors.push("Description is required.");
    if (!isWanted && !results.context.ingredients.trim()) errors.push("Ingredients are required.");

    const now = Math.floor(Date.now() / 1000);

    if (!isWanted && !results.context.expiry) {
        errors.push("Expiry date is required.");
    } 
    else if (!isWanted && results.context.expiry < now) {
        errors.push("Expiry date cannot be in the past.");
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

export function onClickSubmitButton(isWanted, onClick) {
    const bottom = document.getElementById("bottom-bar");

    bottom.onclick = (e) => {
        const btn = e.target.closest(".request-btn");
        if (!btn) return;

        const results = {
            tag: isWanted ? "Wanted" : document.getElementById("input-tag").value,
            name: document.getElementById("input-name").value,
            description: document.getElementById("input-desc").value
        };

        if (!isWanted) {
            const expiryInput = document.getElementById("input-expiry").value;

            results.context = {
                expiry: expiryInput
                    ? Math.floor(new Date(expiryInput).getTime() / 1000)
                    : null,
                ingredients: document.getElementById("input-ingredients").value,
                rating: document.getElementById("input-quality").value
            };
        }

        onClick(results);
    };
}