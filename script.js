let currentPage = 0;
let orderCount = {};
let orderHistory = [];
let orderCode = '';

const pages = [
    {
        category: "Гарнир",
        items: [
            { name: "Бургер", price: 0 },
            { name: "Веган Бургер", price: 0 },
            { name: "Фри", price: 0 },
            { name: "Шаурма", price: 0 },
            { name: "Шаурма Small", price: 0 }
        ]
    },
    {
        category: "Сладости",
        items: [
            { name: "Мороженое", price: 0 },
            { name: "Напиток", price: 0 }
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
        itemPrice.textContent = `${item.price}₽`;

        const orderButton = document.createElement("button");
        orderButton.className = "order-button";
        orderButton.textContent = "Заказать";
        orderCount[item.name] = 0;

        orderButton.onclick = function () {
            orderCount[item.name] = (orderCount[item.name] + 1) % 3;
            if (orderCount[item.name] === 1) {
                orderButton.textContent = "ЗАКАЗАНО x1";
                orderButton.classList.add("ordered1");
            } else if (orderCount[item.name] === 2) {
                orderButton.textContent = "ЗАКАЗАНО x2";
                orderButton.classList.remove("ordered1");
                orderButton.classList.add("ordered2");
            } else {
                orderButton.textContent = "Заказать";
                orderButton.classList.remove("ordered2");
            }
            updatePayButton();
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

function updatePayButton() {
    const anyOrdered = Object.values(orderCount).some(count => count > 0);
    document.getElementById("pay-button").classList.toggle("hidden", !anyOrdered);
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        renderMenu();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        renderMenu();
    }
}

function showCode() {
    document.getElementById("code-container").classList.remove("hidden");
    orderHistory = Object.entries(orderCount).filter(([_, count]) => count > 0);
    orderCode = generateCode();
    document.getElementById("order-code").textContent = orderCode;
}

function generateCode() {
    return Array(6).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
}

function showDeveloper() {
    document.getElementById("developer-section").classList.remove("hidden");
    document.getElementById("code-container").classList.add("hidden");
}

function goBack() {
    document.getElementById("developer-section").classList.add("hidden");
    document.getElementById("code-container").classList.remove("hidden");
}

document.getElementById("developer-input").addEventListener("input", function () {
    if (this.value === orderCode) {
        const orderDetails = orderHistory.map(([item, count]) => `${item} x${count}`).join(", ");
        document.getElementById("order-details").textContent = `Вы заказали: ${orderDetails}`;
    } else {
        document.getElementById("order-details").textContent = "Неверный код!";
    }
});

document.addEventListener("DOMContentLoaded", renderMenu);
