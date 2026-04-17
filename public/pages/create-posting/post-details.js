import { setHtml } from "../../scripts/dom.js";
import { createHeaderBar, onClickBack } from "../../components/header-bar/header-bar.js";
import { navigateBack, setSwipeRoutesTo } from "../../scripts/router.js";

export function renderPostDetail(listing) {
    setHtml("top-bar", createHeaderBar(listing.name, false, false, true));
    onClickBack(() => navigateBack());

    const isWanted = listing.tag === "Wanted";

    setHtml("app", `
        <div class="post-detail">
            <img class="post-detail__img" src="${listing.image_path}" alt="${listing.listing_name}" />
            <div class="post-detail__body">

                <div class="post-detail__meta">
                    <h2 class="post-detail__name">${listing.name}</h2>
                    <span class="post-tag">${listing.tag}</span>
                </div>

                <p class="post-detail__user">Posted by ${listing.user_name} · ${new Date(listing.time * 1000).toLocaleDateString("en-GB")}</p>

                <div class="post-detail__section">
                    <h3 class="post-detail__section-title">Info</h3>
                    <p class="post-detail__desc">${listing.description}</p>
                </div>

                <div class="post-detail__section">
                    <h3 class="post-detail__section-title">Meeting Instructions</h3>
                    <p class="post-detail__meeting-text">${listing.meeting_instructions ?? 'No meeting instructions provided.'}</p>
                </div>

                ${!isWanted ? `
                <div class="post-detail__section">
                    <h3 class="post-detail__section-title">Product Info</h3>
                    <p class="post-detail__info-row"><span>Expires</span><span>${new Date(listing.quality.expires * 1000).toLocaleDateString("en-GB")}</span></p>
                    <p class="post-detail__info-row"><span>Quality</span><span>${listing.quality.rating}</span></p>
                    <p class="post-detail__info-row"><span>Ingredients</span><span>${listing.quality.ingredients}</span></p>
                </div>
                ` : ''}

            </div>
        </div>
    `);

    setHtml("bottom-bar", `
        <div class="bottom-bar__inner">
            <button class="request-btn pressable">
            ${isWanted ? 'Offer Item' : 'Request Listing'}
            </button>
        </div>
    `);

    setSwipeRoutesTo(null, null);
}