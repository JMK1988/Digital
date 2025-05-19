const socket = io();

// Elementos del DOM
const productList = document.getElementById('product-list');
const addProductForm = document.getElementById('add-product-form');

// Escuchar actualizaciones de productos
socket.on('products', (products) => {
    updateProductList(products);
});

// Agregar producto
addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const product = {
        title: document.getElementById('title').value,
        price: parseFloat(document.getElementById('price').value)
    };
    socket.emit('addProduct', product);
    addProductForm.reset();
});

// Eliminar producto
window.deleteProduct = (id) => {
    socket.emit('deleteProduct', id);
};

// Actualizar lista de productos en el DOM
function updateProductList(products) {
    productList.innerHTML = products.map(product => `
        <div class="product-item">
            <h3>${product.title}</h3>
            <p>Precio: $${product.price}</p>
            <button onclick="deleteProduct(${product.id})">Eliminar</button>
        </div>
    `).join('');
}