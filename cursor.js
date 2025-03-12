const circleElement = document.querySelector('.cursor');

const mouse = { x: 0, y: 0 }, circle = { x: 0, y: 0 };
let cursorScale = 1; // Initial scale of the cursor
let cursorBorder = '1px solid #3498db'; // Initial border width and color

window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

// Shrink the cursor and make it thicker on hover over clickable elements
const clickableElements = document.querySelectorAll('button, a, .clickable'); // You can add other selectors if needed

clickableElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorScale = 0.6; // Shrink the cursor when hovering over a clickable element
        cursorBorder = '3px solid #3498db'; // Make the cursor thicker when hovering over a clickable element
        circleElement.style.border = cursorBorder; // Apply the new border thickness
    });

    el.addEventListener('mouseleave', () => {
        cursorScale = 1; // Return to normal size when mouse leaves
        cursorBorder = '1px solid #3498db'; // Return to original border thickness
        circleElement.style.border = cursorBorder; // Apply the original border thickness
    });
});

const speed = 0.15;
const tick = () => {
    circle.x += (mouse.x - circle.x) * speed;
    circle.y += (mouse.y - circle.y) * speed;

    // Apply the scale transformation to the cursor with smooth transition
    circleElement.style.transform = `translate(${circle.x}px, ${circle.y}px) scale(${cursorScale})`;

    window.requestAnimationFrame(tick);
}

tick();
