import { getBarcodeData } from "../../scripts/barcode-item-handler.js";
import { delayedNavigateTo, Routes } from "../../scripts/router.js";
import { showModal } from "./modal.js";

export function showBarcodeModal() {
    return showModal({
        title: "Scan Barcode",
        content: `
          <div class="form-field">
            <label class="form-label">Barcode Number</label>
            <input class="form-input" type="number" id="modal-barcode" placeholder="e.g. 50201600" />
          </div>
        `,
        onSubmit: async () => {
            const barcode = document.getElementById("modal-barcode").value;
            try {
                const product = await getBarcodeData(barcode);

                if (product) {
                    delayedNavigateTo(Routes.CreatePostManual, product);
                } 
                else {
                    console.log("Product not found"); // Need to prompt user, though not worth for prototype?
                }
            }
            catch(error) {
                console.log(`Failled to query api: ${error}`); // Need to prompt user, though not worth for prototype?
            }
        }
    });
}