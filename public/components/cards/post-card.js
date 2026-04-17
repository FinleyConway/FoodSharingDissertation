export function createPostCard(listing) {
    return `
        <div class="post-card pressable" data-id="${listing.id}">
        <div class="post-header">
            <div class="avatar">${Array.from(listing.user_name)[0]}</div>
            <div>
            <p class="post-username">${listing.user_name}</p>
            <p class="post-time">${new Date(listing.time * 1000).toLocaleDateString("en-GB")}</p>
            </div>
        </div>
        <img class="post-img" src="${listing.image_path}" alt="${listing.name}" />
        <div class="post-body">
            <p class="post-title">${listing.name}</p>
            <p class="post-desc">${listing.description}</p>
            <span class="post-tag">${listing.tag}</span>
        </div>
        </div>
    `;
}

export function onClickPostCard(onClick) {
    const app = document.getElementById("app");

    app.onclick = (e) => {
        const card = e.target.closest(".post-card");
        if (!card) return;

        onClick(card.dataset.id);
    };
}