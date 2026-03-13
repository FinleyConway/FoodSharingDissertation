let onLeftHandler = null;
let onRightHandler = null;

export function setSwipePages(onLeft, onRight) {
    onLeftHandler = onLeft;
    onRightHandler = onRight;
}

export function detectSwipe(element) {
    let startX = 0;

    const newElement = element.cloneNode(true);
    element.parentNode.replaceChild(newElement, element);

    newElement.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    newElement.addEventListener('touchend', (e) => {
        const diff = startX - e.changedTouches[0].clientX;

        if (Math.abs(diff) < 50) return; // ignore small movements

        if (diff > 0 && onLeftHandler != null) {
            onLeftHandler();   // swiped left  → next page
        }
        else if (diff < 0 && onRightHandler != null) {
            onRightHandler();  // swiped right → prev page
        }
    });
}