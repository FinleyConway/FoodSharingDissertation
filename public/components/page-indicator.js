export function createPageIndicator(total, current = 0) {
    const dots = Array.from({ length: total }, (_, i) => `
        <span class="dot ${i === current ? 'dot--active' : ''}"></span>
    `).join('');

    return `<div class="page-indicator">${dots}</div>`;
}