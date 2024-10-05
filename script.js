let currentPage = 0;
let orderCount = {};
let orderHistory = [];
let orderCode = '';
let totalCost = 0;
let itemToSize = null;
let currentSizeSelection = [];
let sizesConfirmed = false;

const prices = {
    "Бургер": 4,
    "Веган Бургер": 4.5,
    "Фри": [3, 2.5],   // Обычный, Маленький
    "Шаурма": [4, 3],  // Обычный, Маленький
    "Мороженое": [3.5, 2.5]
};

const pages = [
    {
        category: "Гарнир",
        items: [
            { name: "Бургер", price: 4 },
            { name: "Веган Бургер", price: 4.5 },
            { name: "Фри", price: 3 }
        ]
    },
    {
        category: "Сладости",
        items: [
            { name: "Мороженое", price: 3.5 }
        ]
    },
    {
        category: "Напитки",
        items: [
            { name: "Coca-Cola", price: 2 },
            { name: "McDristy", price: 2 },
            { name: "Mahito", price: 1.5 }
        ]
    }
];

function renderMenu() {
    const category = document.getElementById("category");
    const menuItems = document.getElementById("menu-items");
    const pageNumber = document.getElementById("page-number");

    category.textContent = pages[currentPage].category;
    menuItems.innerHTML = "";

    const items = pages[currentPage].items;
    items.forEach((item, index) => {
        const menuItemDiv = document.createElement("div");
        menuItemDiv.className = "menu-item";

        const itemName = document.createElement("span");
        itemName.className = "menu-item-name";
        itemName.textContent = item.name;

        const itemPrice = document.createElement("span");
        itemPrice.className = "menu-item-price";
        itemPrice.textContent = `${item.price}К`;

        const orderButton = document.createElement("button");
        orderButton.className = "order-button";
        orderButton.textContent = "Заказать";
        orderCount[item.name] = 0;

        orderButton.onclick = function () {
            if (item.name === "Фри" || item.name === "Шаурма" || item.name === "Мороженое") {
                itemToSize = item.name;
                showSizeSelection(item.name);
            } else {
                toggleOrder(item.name, orderButton);
            }
        };

        menuItemDiv.appendChild(itemName);
        menuItemDiv.appendChild(itemPrice);
        menuItemDiv.appendChild(orderButton);

        menuItems.appendChild(menuItemDiv);
    });

    pageNumber.textContent = `Страница ${currentPage + 1}`;
    document.getElementById("prev-page").disabled = currentPage === 0;
    document.getElementById("next-page").disabled = currentPage === pages.length - 1;
}

function toggleOrder(itemName, button) {
    orderCount[itemName] = (orderCount[itemName] + 1) % 3;
    if (orderCount[itemName] === 1) {
        button.textContent = "ЗАКАЗАНО x1";
        button.classList.add("ordered1");
    } else if (orderCount[itemName] === 2) {
        button.textContent = "ЗАКАЗАНО x2";
        button.classList.remove("ordered1");
        button.classList.add("ordered2");
    } else {
        button.textContent = "Заказать";
        button.classList.remove("ordered2");
    }
    updatePayButton();
}

function updatePayButton() {
    const payButton = document.getElementById("pay-button");
    let hasOrders = Object.values(orderCount).some(count => count > 0);
    if (hasOrders) {
        payButton.classList.remove("hidden");
    } else {
        payButton.classList.add("hidden");
    }
}

function showSizeSelection(itemName) {
    const sizeModal = document.getElementById("size-modal");
    const modalTitle = document.getElementById("modal-title");
    const sizeOptions = document.getElementById("size-options");
    const confirmButton = document.getElementById("confirm-button");

    modalTitle.textContent = `Выберите размер для ${itemName}`;
    sizeOptions.innerHTML = "";

    let sizes = [];
    if (itemName === "Фри") {
        sizes = ["Обычный - 3К", "Маленький - 2.5К"];
    } else if (itemName === "Шаурма") {
        sizes = ["Обычный - 4К", "Маленький - 3К"];
    } else if (itemName === "Мороженое") {
        sizes = ["Обычный - 3.5К", "Маленький - 2.5К"];
    }

    sizes.forEach(size => {
        const sizeButton = document.createElement("button");
        sizeButton.textContent = size;
        sizeButton.onclick = function () {
            currentSizeSelection.push(size);
            confirmButton.classList.remove("hidden");
        };
        sizeOptions.appendChild(sizeButton);
    });

    sizeModal.classList.remove("hidden");
}

function confirmSize() {
    const sizeModal = document.getElementById("size-modal");
    sizeModal.classList.add("hidden");
    sizesConfirmed = true;
    updatePayButton();
}

function showCode() {
    // Проверяем, если среди заказанных товаров есть те, которые требуют выбора размера
    let hasSizeSelection = false;
    Object.keys(orderCount).forEach(item => {
        if (orderCount[item] > 0 && (item === "Фри" || item === "Шаурма" || item === "Мороженое")) {
            hasSizeSelection = true;
        }
    });

    // Если есть товары с выбором размера и размер не был подтверждён, показываем модальное окно
    if (hasSizeSelection && !sizesConfirmed) {
        alert("Вы должны выбрать размер для товаров.");
        return;
    }

    // Если все условия выполнены, показываем код заказа
    const codeContainer = document.getElementById("code-container");
    codeContainer.classList.remove("hidden");

    orderCode = generateOrderCode();
    document.getElementById("order-code").textContent = orderCode;
    document.getElementById("total-cost").textContent = `Итого: ${totalCost}К`;
}

function generateOrderCode() {
    let code = "";
    Object.keys(orderCount).forEach(item => {
        if (orderCount[item] > 0) {
            code += `${item[0]}${orderCount[item]} `;
        }
    });
    return code.trim();
}

function goBack() {
    const codeContainer = document.getElementById("code-container");
    const developerSection = document.getElementById("developer-section");
    codeContainer.classList.add("hidden");
    developerSection.classList.add("hidden");
}

renderMenu();
