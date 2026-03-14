import { setHtml } from "../../scripts/dom.js";
import { createHeaderBar, onClickBack } from "../../components/header-bar/header-bar.js";
import { getPreviousRoute, navigateTo, setSwipeRoutesTo } from "../scripts/router.js";

export function renderPostDetail(listing) {
    setHtml("top-bar", createHeaderBar(listing.name, false, false, true));
    onClickBack(() => navigateTo(getPreviousRoute()));

    const isWanted = listing.tag === "Wanted";

    setHtml("app", `
    <div class="post-detail">
      <img class="post-detail__img" src="${listing.image}" alt="${listing.name}" />
      
      <div class="post-detail__body">
        <div class="post-detail__meta">
          <h2 class="post-detail__name">${listing.name}</h2>
          <span class="post-tag">${listing.tag}</span>
        </div>

        <p class="post-detail__user">Posted by ${listing.user} · ${listing.time}</p>
        <p class="post-detail__desc">${listing.desc}</p>

        ${!isWanted ? `
          <p class="post-detail__expires">Expires: ${listing.expires}</p>
        ` : ''}

        <div class="post-detail__meeting">
          <h3>Meeting Instructions</h3>
          <p>${listing.meetingInstructions ?? 'No meeting instructions provided.'}</p>
        </div>
      </div>
    </div>
  `);

    setHtml("bottom-bar", `
    <div class="bottom-bar__inner">
      <button class="request-btn">
        ${isWanted ? 'Offer Item' : 'Request Listing'}
      </button>
    </div>
  `);

    setSwipeRoutesTo(null, null);
}