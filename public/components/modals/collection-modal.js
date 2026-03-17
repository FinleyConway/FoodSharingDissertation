import { showModal } from "./modal.js";

export function showCollectionModal() {
    return showModal({
        title: "New Collection",
        content: `
            <div class="form-field">
                <label class="form-label">Name</label>
                <input class="form-input" type="text" id="modal-name" placeholder="e.g. My Pantry" />
            </div>
            <div class="form-field">
                <label class="form-label">Description</label>
                <textarea class="form-input form-textarea" id="modal-desc" placeholder="e.g. General food items"></textarea>
            </div>
        `,
        onSubmit: () => {
            const name = document.getElementById("modal-name").value;
            const desc = document.getElementById("modal-desc").value;
            
            console.log("new collection:", { name, desc });
        }
    });
}