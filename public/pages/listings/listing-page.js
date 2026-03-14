import { createAddButton } from "../../components/footer-bar/add-button.js";
import { createPageIndicator } from "../../components/footer-bar/page-indicator.js";
import { createHeaderBar } from "../../components/header-bar/header-bar.js";
import { createPostCard, onClickPostCard } from "../../components/cards/post-card.js"
import { setHtml } from "../../scripts/dom.js";
import { setSwipeRoutesTo } from "../../scripts/router.js";

export function renderListingsPage({ title, listings, pageIndex, totalPages, onCardClick, onSwipeLeft, onSwipeRight }) {
  setHtml("top-bar", createHeaderBar(title, true, true));

  setHtml("app", listings.map(item => createPostCard(item)).join(""));
  onClickPostCard(onCardClick);

  setHtml("bottom-bar", `
    <div class="bottom-bar__inner">
      ${createPageIndicator(totalPages, pageIndex)}
      ${createAddButton()}
    </div>
  `);

  setSwipeRoutesTo(onSwipeLeft, onSwipeRight);
}