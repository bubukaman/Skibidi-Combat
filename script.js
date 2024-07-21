let clickCount = 0;

document.getElementById('click-button').addEventListener('click', () => {
    clickCount++;
    document.getElementById('click-count').textContent = clickCount;
});
