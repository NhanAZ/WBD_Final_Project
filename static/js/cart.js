// Khi tài liệu đã sẵn sàng
$(document).ready(function () {
	// Lấy dữ liệu giỏ hàng từ localStorage hoặc khởi tạo một mảng rỗng nếu không có dữ liệu
	let cart = JSON.parse(localStorage.getItem('cart')) || [];

	// Hàm tạo một hàng mới trong bảng giỏ hàng
	function createRow(item) {
		return `
			<tr>
				<td>${item.name}</td> <!-- Tên sản phẩm -->
				<td>$${item.price.toFixed(2)}</td> <!-- Giá sản phẩm -->
				<td class="product-total">$${(item.price * item.quantity).toFixed(2)}</td> <!-- Tổng giá của sản phẩm -->
				<td>
					<button class="btn btn-danger remove-product" data-id="${item.id}">Xóa</button> <!-- Nút xóa sản phẩm -->
				</td>
			</tr>
		`;
	}

	// Hàm tính tổng giá trị giỏ hàng
	function calculateTotal(cart) {
		return cart.reduce((total, item) => total + item.price * item.quantity, 0);
	}

	// Hàm hiển thị giỏ hàng
	function renderCart() {
		const cartItems = $('#cart-items'); // Lấy phần tử chứa các hàng trong giỏ hàng
		cartItems.empty(); // Xóa tất cả các hàng hiện tại
		cartItems.append(cart.map(createRow).join('')); // Thêm các hàng mới từ giỏ hàng
		$('#cart-total').text(`$${calculateTotal(cart).toFixed(2)}`); // Hiển thị tổng giá trị giỏ hàng
	}

	// Hiển thị giỏ hàng khi tài liệu đã sẵn sàng
	renderCart();

	// Khi người dùng nhấp vào nút xóa sản phẩm
	$('#cart-items').on('click', '.remove-product', function () {
		const itemId = $(this).data('id'); // Lấy id của sản phẩm cần xóa
		cart = cart.filter(i => i.id !== itemId); // Loại bỏ sản phẩm khỏi giỏ hàng
		localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật giỏ hàng trong localStorage
		renderCart(); // Hiển thị lại giỏ hàng
	});
});
