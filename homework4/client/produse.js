function displayProducts(products) {
    const productListDiv = document.getElementById('product-list');
    productListDiv.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <div>
                <strong>ID:</strong> ${product.id}<br>
                <strong>Name:</strong> ${product.name}<br>
                <strong>Price:</strong> ${product.pret}<br>
                <strong>Quantity:</strong> ${product.cantitate}<br>
                <strong>Description:</strong> ${product.descriere}
            </div>
        `;
        productListDiv.appendChild(productDiv);
    });
}

function addProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const productDescription = document.getElementById('productDescription').value;

    fetch('http://localhost:2108/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: productName,
            pret: parseFloat(productPrice),
            cantitate: parseInt(productQuantity),
            descriere: productDescription,
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchProducts();
    })
    .catch(error => console.error('Error:', error));
}

function deleteProduct() {
    const productId = document.getElementById('deleteProductId').value;

    fetch(`http://localhost:2108/api/products/${productId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchProducts();
    })
    .catch(error => console.error('Error:', error));
}

function getProduct() {
    const productId = document.getElementById('getProductId').value;

    fetch(`http://localhost:2108/api/products/${productId}`)
    .then(response => response.json())
    .then(data => alert(`Product: ${JSON.stringify(data)}`))
    .catch(error => console.error('Error:', error));
}

function updateProduct() {
    const productId = document.getElementById('updateProductId').value;
    const newName = document.getElementById('productName').value;
    const newPrice = document.getElementById('productPrice').value;
    const newQuantity = document.getElementById('productQuantity').value;
    const newDescription = document.getElementById('productDescription').value;

    fetch(`http://localhost:2108/api/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: newName,
            pret: parseInt(newPrice),
            cantitate: parseFloat(newQuantity),
            descriere: newDescription,
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchProducts();
    })
    .catch(error => console.error('Error:', error));
}

function fetchProducts() {
    fetch('http://localhost:2108/api/products')
    .then(response => response.json())
    .then(data => displayProducts(data.products))
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', fetchProducts);