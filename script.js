let clickCount = 0;
let energy = 150; // Начальное количество энергии
const maxEnergy = 150; // Максимальная энергия (настраивается)
const energyRecoveryRate = 2000; // Время восстановления 1 энергии в миллисекундах (настраивается)

const clickButton = document.getElementById('click-button');
const clickCountSpan = document.getElementById('click-count');
const clickImage = document.getElementById('click-image');
const overlayImage = document.getElementById('overlay-image');
const menuIcon = document.getElementById('menu-icon');
const menuOptions = document.getElementById('menu-options');
const energyCount = document.getElementById('energy-count');

clickButton.addEventListener('click', () => {
    if (energy > 0) {
        clickCount++;
        energy--;
        updateClickCount();
        updateEnergyCount();
        updateClickImage();
    } else {
        // Если энергии нет, просто обновляем отображение
        updateEnergyCount();
    }
});

menuIcon.addEventListener('click', () => {
    menuOptions.style.display = menuOptions.style.display === 'block' ? 'none' : 'block';
});

function updateClickCount() {
    clickCountSpan.textContent = clickCount;
    clickCountSpan.style.color = '#808080';
    setTimeout(() => {
        clickCountSpan.style.color = '#ffffff';
    }, 100);
}

function updateClickImage() {
    overlayImage.style.display = 'block';
    overlayImage.classList.remove('image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7', 'image8');
    
    if (clickCount < 5) {
        overlayImage.src = 'image1.png';
        overlayImage.classList.add('image1');
    } else if (clickCount < 12) {
        overlayImage.src = 'image2.png';
        overlayImage.classList.add('image2');
    } else if (clickCount < 16) {
        overlayImage.src = 'image3.png';
        overlayImage.classList.add('image3');
    } else if (clickCount < 20) {
        overlayImage.src = 'image4.png';
        overlayImage.classList.add('image4');
    } else if (clickCount < 24) {
        overlayImage.src = 'image5.png';
        overlayImage.classList.add('image5');
    } else if (clickCount < 30) {
        overlayImage.src = 'image6.png';
        overlayImage.classList.add('image6');
    } else if (clickCount < 35) {
        overlayImage.src = 'image7.png';
        overlayImage.classList.add('image7');
    } else if (clickCount < 40) {
        overlayImage.src = 'image8.png';
        overlayImage.classList.add('image8');
    } else {
        overlayImage.src = 'image8.png';
        overlayImage.classList.add('image8');
    }
}

function updateEnergyCount() {
    energyCount.textContent = `${energy}/${maxEnergy}`;
}

function recoverEnergy() {
    if (energy < maxEnergy) {
        energy++;
        updateEnergyCount();
    }
}

setInterval(recoverEnergy, energyRecoveryRate); // Восстановление энергии по одной каждые 2 секунды (2000 мс)
