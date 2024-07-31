let clickCount = 0;
const clickButton = document.getElementById('click-button');
const clickCountSpan = document.getElementById('click-count');
const clickImage = document.getElementById('click-image');
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
    if (clickCount < 5) {
        clickImage.src = 'image1.png';
    } else if (clickCount < 12) {
        clickImage.src = 'image2.png';
    } else if (clickCount < 16) {
        clickImage.src = 'image3.png';
    } else if (clickCount < 20) {
        clickImage.src = 'image4.png';
    } else if (clickCount < 24) {
        clickImage.src = 'image5.png';
    } else if (clickCount < 30) {
        clickImage.src = 'image6.png';
    } else if (clickCount < 35) {
        clickImage.src = 'image7.png';
    } else if (clickCount < 40) {
        clickImage.src = 'image8.png';
    } else {
        clickImage.src = 'image8.png'; // You can change this to a different image if needed
    }
}
