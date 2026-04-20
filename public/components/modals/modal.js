export function showModal({ title, content, onSubmit }) {
    const existing = document.getElementById("modal-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "modal-overlay";
    overlay.className = "modal-overlay";

    overlay.innerHTML = `
        <div class="modal">
            <h2 class="modal__title">${title}</h2>
            <div class="modal__content">
                ${content}
            </div>
            <div class="modal__actions">
                <button class="modal__cancel pressable" data-action="cancel">Cancel</button>
                <button class="modal__submit pressable" data-action="submit">Submit</button>
            </div>
        </div>
  `;

    document.body.appendChild(overlay);

    overlay.onclick = (e) => {
        if (e.target === overlay) closeModal();
        if (e.target.closest('[data-action="cancel"]')) closeModal();
        if (e.target.closest('[data-action="submit"]')) {
            if (onSubmit()) {
                closeModal();
            }          
        }
    };
}

export function closeModal() {
    const overlay = document.getElementById("modal-overlay");
    if (overlay) overlay.remove();
}