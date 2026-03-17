export function createImagePicker(preview_url = "") {
    const hasImage = preview_url !== "";
    
    return `
        <div class="form-image-picker pressable" data-action="pick-image">
        <div class="form-image-picker__placeholder" style="${hasImage ? 'display:none;' : ''}">
            <span>📷</span>
            <p>Tap to add image</p>
        </div>
        <img class="form-image-picker__preview" id="image-preview" 
            src="${preview_url}" 
            alt="" 
            style="${hasImage ? '' : 'display:none;'}" 
        />
        </div>
    `;
}

export function openImagePicker(onImageSelected) {
    const app = document.getElementById("app");
    
    app.onclick = (e) => {
        if (e.target.closest('[data-action="pick-image"]')) {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";

            input.onchange = (e) => {
                const file = e.target.files[0];
                const url = URL.createObjectURL(file);
                const preview = document.getElementById("image-preview");
                const placeholder = document.querySelector(".form-image-picker__placeholder");

                preview.src = url;
                preview.style.display = "block";
                placeholder.style.display = "none";

                onImageSelected(file);
            };

            input.click();
        }
    };
}