export function createPostCard(listing) {
  return `
    <div class="post-card">
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