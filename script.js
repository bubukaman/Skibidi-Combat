let currentPage = 0;
let orderCount = {};
let orderHistory = [];
let orderCode = '';
let totalCost = 0;
const prices = {
    "Бургер": 4,
    "Веган Бургер": 4.5,
    "Фри": [3, 2.5],   // Обычный, Маленький
    "Шаурма": [4, 3],  // Обычный, Маленький
    "Мороженое": [3.5, 2.5]
};
let itemToSize = null;
let currentSizeSelection = [];

const pages = [
    {
        category: "Гарнир",
        items: [
            { name: "Бургер", price: 4 },
            { name: "Веган Бургер", price: 4.5 },
            { name: "Фри", price: 3 },
            { name: "Шаурма", price: 4 }
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
            orderCount[item.name] = (orderCount[item.name] + 1) % 3;
            if (orderCount[item.name] === 1) {
                if (item.name === "Фри" || item.name === "Шаурма" || item.name === "Мороженое") {
                    itemToSize = item.name;
                    showSizeSelection(item.name);
                }
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

function updatePayButton()
