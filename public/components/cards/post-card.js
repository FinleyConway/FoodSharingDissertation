export function createPostCard(listing) {
    return `
        <div class="post-card" data-id="${listing.id}">
        <div class="post-header">
            <div class="avatar">${listing.initials}</div>
            <div>
            <p class="post-username">${listing.user}</p>
            <p class="post-time">${listing.time}</p>
            </div>
        </div>
        <img class="post-img" src="${listing.image}" alt="${listing.name}" />
        <div class="post-body">
            <p class="post-title">${listing.name}</p>
            <p class="post-desc">${listing.desc}</p>
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