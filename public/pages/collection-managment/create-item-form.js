export function createSubmitButton() {
    return `
        <button class="request-btn pressable" data-action="submit">Add item</button>
    `;
}

export function validateItem(results, image) {
    const errors = [];

    if (!image) errors.push("Please add an image.");
    if (!results.name.trim()) errors.push("Food name is required.");
    if (!results.description.trim()) errors.push("Description is required.");

    const now = Math.floor(Date.now() / 1000);

    if (!results.expiry) {
        errors.push("Expiry date is required.");
    } 
    else if (results.expiry < now) {
        errors.push("Expiry date cannot be in the past.");
    }

    return errors;
}

export function onClickSubmitItemButton(onClick) {
    const bottom = document.getElementById("bottom-bar");

    bottom.onclick = (e) => {
        const btn = e.target.closest(".request-btn");
        if (!btn) return;

        const expiryInput = document.getElementById("input-expiry").value;

        const results = {
            name: document.getElementById("input-name").value,
            description: document.getElementById("input-desc").value,
            expiry: expiryInput
                    ? Math.floor(new Date(expiryInput).getTime() / 1000)
                    : null,
        };

        onClick(results);
    };
}