const menuItems = [
  {
    name: "Bruschetta",
    category: "starters",
    price: "$6",
    description: "Grilled bread with tomatoes, garlic, and basil.",
    image: "https://source.unsplash.com/400x300/?bruschetta"
  },
  {
    name: "Caesar Salad",
    category: "starters",
    price: "$8",
    description: "Crisp romaine with Caesar dressing, croutons, and parmesan.",
    image: "https://source.unsplash.com/400x300/?salad"
  },
  {
    name: "Grilled Salmon",
    category: "mains",
    price: "$18",
    description: "Fresh salmon fillet grilled to perfection.",
    image: "https://source.unsplash.com/400x300/?salmon"
  },
  {
    name: "Spaghetti Bolognese",
    category: "mains",
    price: "$15",
    description: "Classic Italian pasta with rich meat sauce.",
    image: "https://source.unsplash.com/400x300/?spaghetti"
  },
  {
    name: "Tiramisu",
    category: "desserts",
    price: "$7",
    description: "Coffee-flavored Italian dessert with mascarpone cheese.",
    image: "https://source.unsplash.com/400x300/?tiramisu"
  },
  {
    name: "Lemon Cheesecake",
    category: "desserts",
    price: "$6",
    description: "Creamy cheesecake with a zesty lemon twist.",
    image: "https://source.unsplash.com/400x300/?cheesecake"
  },
  {
    name: "Iced Latte",
    category: "drinks",
    price: "$4",
    description: "Chilled espresso with milk over ice.",
    image: "https://source.unsplash.com/400x300/?latte"
  },
  {
    name: "Sparkling Water",
    category: "drinks",
    price: "$3",
    description: "Refreshing carbonated mineral water.",
    image: "https://source.unsplash.com/400x300/?sparklingwater"
  }
];

const container = document.getElementById('menu-container');
const buttons = document.querySelectorAll('nav button');

// Render menu items
function renderMenu(category = "all") {
  container.innerHTML = "";
  const filtered = category === "all"
    ? menuItems
    : menuItems.filter(item => item.category === category);

  filtered.forEach(item => {
    const div = document.createElement('div');
    div.className = "menu-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="menu-content">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="price">${item.price}</div>
      </div>
    `;
    container.appendChild(div);
  });
}

// Category filter
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(btn.dataset.category);
  });
});

// Initial render
renderMenu();
