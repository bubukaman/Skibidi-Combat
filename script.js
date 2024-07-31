let clickCount = 0;
const clickButton = document.getElementById('click-button');
const clickCountSpan = document.getElementById('click-count');
const clickImage = document.getElementById('click-image');
const overlayImage = document.getElementById('overlay-image');
const menuIcon = document.getElementById('menu-icon');
const menuOptions = document.getElementById('menu-options');

clickButton.addEventListener('click', () => {
    clickCount++;
    clickCountSpan.textContent = clickCount;
    clickCountSpan.style.color = '#808080'; // Серый цвет
    setTimeout(() => {
        clickCountSpan.style.color = '#ffffff'; // Белый цвет
    }, 100);
    updateClickImage();
});

menuIcon.addEventListener('click', () => {
    menuOptions.style.display = menuOptions.style.display === 'block' ? 'none' : 'block';
});

function updateClickImage() {
    overlayImage.style.display = 'block'; // Ensure the overlay image is visible

    if (clickCount < 5) {
        overlayImage.src = 'image1.png';
    } else if (clickCount < 12) {
        overlayImage.src = 'image2.png';
    } else if (clickCount < 16) {
        overlayImage.src = 'image3.png';
    } else if (clickCount < 20) {
        overlayImage.src = 'image4.png';
    } else if (clickCount < 24) {
        overlayImage.src = 'image5.png';
    } else if (clickCount < 30) {
        overlayImage.src = 'image6.png';
    } else if (clickCount < 35) {
        overlayImage.src = 'image7.png';
    } else if (clickCount < 40) {
        overlayImage.src = 'image8.png';
    } else {
        overlayImage.src = 'image8.png'; // You can change this to a different image if needed
    }
}
