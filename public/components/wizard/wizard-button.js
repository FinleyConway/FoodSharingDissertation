export function createWizardCard(action, icon, title, desc) {
    return `
        <div class="wizard-card pressable" data-action="${action}">
            <div class="wizard-card__icon">${icon}</div>
            <div class="wizard-card__body">
                <h3>${title}</h3>
                <p>${desc}</p>
            </div>
        </div>
  `;
}

export function onClickWizardCard(onClick) {
    document.getElementById("app").onclick = (e) => {
        const card = e.target.closest(".wizard-card");
        if (!card) return;

        onClick(card.dataset.action);
    };
}