export function showModal({ title, fields, onSubmit }) {
    const existing = document.getElementById("modal-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "modal-overlay";
    overlay.className = "modal-overlay";

    overlay.innerHTML = `
        <div class="modal">
            <h2 class="modal__title">${title}</h2>
            <div class="modal__fields">
                ${fields.map(f => `
                <div class="form-field">
                    <label class="form-label">${f.label}</label>
                    <${f.multiline ? 'textarea class="form-input form-textarea"' : 'input class="form-input" type="text"'} 
                    id="modal-field-${f.key}" 
                    placeholder="${f.placeholder ?? ''}"
                    >${f.multiline ? '' : ''}${f.multiline ? '</textarea>' : ''}
                </div>
                `).join("")}
            </div>
            <div class="modal__actions">
                <button class="modal__cancel pressable" data-action="cancel">Cancel</button>
                <button class="modal__submit pressable" data-action="submit">Create</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.onclick = (e) => {
        if (e.target === overlay) closeModal(); // tap outside to dismiss
        if (e.target.closest('[data-action="cancel"]')) closeModal();
        if (e.target.closest('[data-action="submit"]')) {
            const result = {};
            fields.forEach(f => {
                result[f.key] = document.getElementById(`modal-field-${f.key}`).value;
            });
            onSubmit(result);
            closeModal();
        }
    };
}

export function closeModal() {
    const overlay = document.getElementById("modal-overlay");
    if (overlay) overlay.remove();
}