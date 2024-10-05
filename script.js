const pages = [
    {
        category: "Гарнир",
        items: [
            { name: "Бургер", price: 0 },     // Здесь измените цену
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

let currentPage = 0;

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
        orderButton.onclick = function () {
            if (!orderButton.classList.contains("ordered")) {
                orderButton.textContent = "ЗАКАЗАНО";
                orderButton.classList.add("ordered");
                orderButton.style.backgroundColor = "gray";
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

document.addEventListener("DOMContentLoaded", renderMenu);
