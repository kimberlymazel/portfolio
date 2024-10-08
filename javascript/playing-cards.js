// Keep track of whether a card is zoomed and its original position
let isZoomed = false;
let originalPosition = { top: 0, left: 0 };
let originalTransform = 'none';

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', function () {
    if (!isZoomed) {
        this.classList.add('zoom');
        // Store the original position and size
        originalPosition = {
            top: this.style.top,
            left: this.style.left,
            width: this.offsetWidth,
            height: this.offsetHeight
        };

        // Store the original transform (if any)
        originalTransform = window.getComputedStyle(card).transform;
        
        const { left, top, width, height } = this.getBoundingClientRect();
        // Move and zoom the card to the center of the screen with scaling at the same time
        const translateX = window.innerWidth / 2 - left - this.offsetWidth / 2;
        const translateY = window.innerHeight / 2 - top - this.offsetHeight / 2;

        // Apply both the original transform and the new translate + scale transformation
        this.style.transform = `${originalTransform !== 'none' ? originalTransform : ''} translate(${translateX}px, ${translateY}px)`;
        this.style.zIndex = 10;

        isZoomed = true; // Mark as zoomed
    } else {
        this.classList.remove('zoom');

        // Restore the original position and size
        this.style.transform = originalTransform; // Reset to original transform (even if it's 'none')
        this.style.zIndex = 1;

        isZoomed = false; // Mark as not zoomed
    }
  });
});
