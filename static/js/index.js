$(document).ready(function () {
	let cart = JSON.parse(localStorage.getItem('cart')) || [];

	const products = [
		{ id: 1, name: 'Minecraft', description: 'Trò chơi điện tử', price: 6.99, image: 'assets/img/index/Minecraft.png' },
		{ id: 2, name: 'Geometry Dash', description: 'Trò chơi điện tử', price: 1.99, image: 'assets/img/index/Geometryjump.png' },
		{ id: 3, name: 'Stardew Valley', description: 'Nhập vai', price: 4.99, image: 'assets/img/index/StardewValley.png' },
		{ id: 4, name: 'Terraria', description: 'Phiêu lưu', price: 4.99, image: 'assets/img/index/Terraria.png' },
		{ id: 5, name: 'RFS - Real Flight Simulator', description: 'Mô phỏng', price: 0.99, image: 'assets/img/index/RFS-RealFlightSimulator.png' },
		{ id: 6, name: 'Grand Theft Auto: San Andreas', description: 'Hành động', price: 6.99, image: 'assets/img/index/GrandTheftAutoSanAndreas.png' }
	];

	function createProductCard(product) {
		return `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Giá: $${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Thêm vào Giỏ hàng</button>
                    </div>
                </div>
            </div>
        `;
	}

	function addToCart(productId) {
		const product = products.find(p => p.id === productId);
		if (!product) {
			alert('Sản phẩm không tồn tại.');
			return;
		}

		const cartItem = cart.find(item => item.id === productId);
		if (cartItem) {
			alert(`${product.name} đã có trong giỏ hàng.`);
			return;
		}

		cart.push({ id: product.id, name: product.name, price: product.price });
		localStorage.setItem('cart', JSON.stringify(cart));
		alert(`${product.name} đã được thêm vào giỏ hàng.`);
	}

	function renderProducts() {
		let productList = $('#product-list');
		productList.empty();
		productList.append(products.map(createProductCard).join(''));
	}

	renderProducts();

	$('#product-list').on('click', '.add-to-cart', function () {
		let productId = $(this).data('id');
		addToCart(productId);
	});
});
