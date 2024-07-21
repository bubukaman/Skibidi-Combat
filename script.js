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
    if (clickCount < 10000) {
        clickImage.src = 'images/image1.png';
    } else if (clickCount < 80000) {
        clickImage.src = 'images/image2.png';
    } else if (clickCount < 200000) {
        clickImage.src = 'images/image3.png';
    } else if (clickCount < 500000) {
        clickImage.src = 'images/image4.png';
    } else if (clickCount < 1000000) {
        clickImage.src = 'images/image5.png';
    } else {
        clickImage.src = 'images/image6.png';
    }
}
