// Khi tài liệu đã sẵn sàng
$(document).ready(function () {
	// Lấy dữ liệu giỏ hàng từ localStorage hoặc khởi tạo một mảng rỗng nếu không có dữ liệu
	let cart = JSON.parse(localStorage.getItem('cart')) || [];

	// Dữ liệu sản phẩm
	const products = [
		{ id: 1, name: 'Minecraft', description: 'Trò chơi điện tử', price: 6.99, image: 'assets/img/index/Minecraft.png' },
		{ id: 2, name: 'Geometry Dash', description: 'Trò chơi điện tử', price: 1.99, image: 'assets/img/index/Geometryjump.png' },
		{ id: 3, name: 'Stardew Valley', description: 'Nhập vai', price: 4.99, image: 'assets/img/index/StardewValley.png' },
		{ id: 4, name: 'Terraria', description: 'Phiêu lưu', price: 4.99, image: 'assets/img/index/Terraria.png' },
		{ id: 5, name: 'RFS - Real Flight Simulator', description: 'Mô phỏng', price: 0.99, image: 'assets/img/index/RFS-RealFlightSimulator.png' },
		{ id: 6, name: 'Grand Theft Auto: San Andreas', description: 'Hành động', price: 6.99, image: 'assets/img/index/GrandTheftAutoSanAndreas.png' }
	];

	// Hàm tạo thẻ sản phẩm
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

	// Hàm thêm sản phẩm vào giỏ hàng
	function addToCart(productId) {
		let product = products.find(p => p.id === productId); // Tìm sản phẩm theo id
		if (!product) { // Nếu không tìm thấy sản phẩm
			alert('Sản phẩm không tồn tại.');
			return;
		}
		let cartItem = cart.find(p => p.id === productId); // Tìm sản phẩm trong giỏ hàng
		if (cartItem) { // Nếu sản phẩm đã có trong giỏ hàng
			alert(`${product.name} đã có trong giỏ hàng.`);
		} else { // Nếu sản phẩm chưa có trong giỏ hàng
			cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 }); // Thêm sản phẩm vào giỏ hàng
			localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật giỏ hàng trong localStorage
			alert(`${product.name} đã được thêm vào giỏ hàng.`);
		}
	}

	// Hàm hiển thị sản phẩm
	function renderProducts() {
		let productList = $('#product-list'); // Lấy phần tử chứa danh sách sản phẩm
		productList.empty(); // Xóa tất cả sản phẩm hiện tại
		productList.append(products.map(createProductCard).join('')); // Thêm các sản phẩm mới từ dữ liệu sản phẩm
	}

	// Hiển thị sản phẩm khi tài liệu đã sẵn sàng
	renderProducts();

	// Khi người dùng nhấp vào nút "Thêm vào Giỏ hàng"
	$('#product-list').on('click', '.add-to-cart', function () {
		let productId = $(this).data('id'); // Lấy id của sản phẩm
		addToCart(productId); // Thêm sản phẩm vào giỏ hàng
	});
});
