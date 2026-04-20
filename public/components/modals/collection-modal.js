import { createCollection } from "../../scripts/create_collection.js";
import { getUserId } from "../../scripts/current_user.js";
import { showModal } from "./modal.js";

export function showCollectionModal(onCreate) {
    showModal({
        title: "New Collection",
        content: `
            <div class="form-field">
                <label class="form-label">Name</label>
                <input class="form-input" type="text" id="modal-name" placeholder="e.g. My Pantry" />
            </div>
            <div class="form-field">
                <label class="form-label">Description</label>
                <textarea class="form-input form-textarea" id="modal-desc" placeholder="e.g. General food items"></textarea>
                <div class="form-field">
                    <label class="form-label">Collection Type</label>
                    <select class="form-input" id="input-type">
                    <option value="Inventory">Inventory</option>
                    <option value="Meal">Meal</option>
                </select>
            </div>
            </div>

            <div class="form-error" id="modal-error"></div>
        `,
        onSubmit: () => {
            const name = document.getElementById("modal-name").value.trim();
            const desc = document.getElementById("modal-desc").value.trim();
            const type = document.getElementById("input-type").value.trim();
            const error = document.getElementById("modal-error");
            
            if (!name || !desc || !type) {
                error.textContent = "Fields must not be empty";
                return false;
            }

            createCollection({
                "user_id": getUserId(),
                "name": name, 
                "description": desc,
                "type": type,
                "howToMake": ""
            })

            onCreate();

            return true;
        }
    });
}