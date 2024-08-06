let clickCount = 0;
let energy = 50; // Maximum energy
const maxEnergy = 50; // Configurable maximum energy
const energyRecoveryTime = 1 * 60 * 1000; // 20 minutes in milliseconds

const clickButton = document.getElementById('click-button');
const clickCountSpan = document.getElementById('click-count');
const clickImage = document.getElementById('click-image');
const overlayImage = document.getElementById('overlay-image');
const menuIcon = document.getElementById('menu-icon');
const menuOptions = document.getElementById('menu-options');
const energyBar = document.getElementById('energy-bar');
const noEnergyMessage = document.getElementById('no-energy-message');
const recoveryTime = document.getElementById('recovery-time');

clickButton.addEventListener('click', () => {
    if (energy > 0) {
        clickCount++;
        energy--;
        updateClickCount();
        updateEnergyBar();
        updateClickImage();
    } else {
        displayNoEnergyMessage();
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

function updateEnergyBar() {
    const energyPercentage = (energy / maxEnergy) * 100;
    energyBar.style.width = `${energyPercentage}%`;
    if (energy === 0) {
        displayNoEnergyMessage();
    }
}

function displayNoEnergyMessage() {
    energyBar.parentNode.classList.add('hidden');
    noEnergyMessage.classList.remove('hidden');
    const recoveryMinutes = Math.ceil(energyRecoveryTime / 60000);
    recoveryTime.textContent = `Восстановление через ${recoveryMinutes} минут`;
}

function recoverEnergy() {
    energy = maxEnergy;
    energyBar.parentNode.classList.remove('hidden');
    noEnergyMessage.classList.add('hidden');
    updateEnergyBar();
}

setInterval(recoverEnergy, energyRecoveryTime);
