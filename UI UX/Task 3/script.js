const products = [
  {
    name: "Wireless Headphones",
    category: "electronics",
    price: "$59",
    image: "https://source.unsplash.com/400x300/?headphones"
  },
  {
    name: "Smart Watch",
    category: "electronics",
    price: "$99",
    image: "https://source.unsplash.com/400x300/?smartwatch"
  },
  {
    name: "Men's T-Shirt",
    category: "clothing",
    price: "$25",
    image: "https://source.unsplash.com/400x300/?tshirt"
  },
  {
    name: "Women's Jacket",
    category: "clothing",
    price: "$45",
    image: "https://source.unsplash.com/400x300/?jacket"
  },
  {
    name: "Blender Mixer",
    category: "home",
    price: "$35",
    image: "https://source.unsplash.com/400x300/?blender"
  },
  {
    name: "LED Table Lamp",
    category: "home",
    price: "$22",
    image: "https://source.unsplash.com/400x300/?lamp"
  }
];

const container = document.getElementById('product-container');
const buttons = document.querySelectorAll('nav button');
const searchInput = document.getElementById('searchInput');

// Render products
function renderProducts(filterCategory = 'all', searchTerm = '') {
  container.innerHTML = "";

  const filtered = products.filter(product => {
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">${product.price}</p>
    `;
    container.appendChild(card);
  });
}

// Handle category buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const selectedCategory = button.dataset.category;
    renderProducts(selectedCategory, searchInput.value);
  });
});

// Handle search
searchInput.addEventListener('input', () => {
  const activeButton = document.querySelector('nav button.active');
  const selectedCategory = activeButton ? activeButton.dataset.category : 'all';
  renderProducts(selectedCategory, searchInput.value);
});

// Initial render
renderProducts();
