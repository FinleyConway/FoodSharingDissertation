export function createAddButton() {
    return `
        <button class="add-btn pressable" data-action="add-btn">+</button>
    `;
}

export function onClickAddButton(onClick) {
    const bottom = document.getElementById("bottom-bar");

    bottom.onclick = (e) => {
        const btn = e.target.closest(".add-btn");
        if (!btn) return;

        onClick();
    };
}