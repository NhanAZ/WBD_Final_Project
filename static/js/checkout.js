// Khi tài liệu đã sẵn sàng
$(document).ready(function () {
	// Lấy dữ liệu giỏ hàng từ localStorage hoặc khởi tạo một mảng rỗng nếu không có dữ liệu
	const cart = JSON.parse(localStorage.getItem('cart')) || [];

	// Hàm kiểm tra tính hợp lệ của email
	function isValidEmail(email) {
		// Biểu thức chính quy để kiểm tra định dạng email
		// Biểu thức này tham khảo từ A.I
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	// Khi người dùng gửi form thanh toán
	$('#checkout-form').submit(function (event) {
		event.preventDefault(); // Ngăn chặn hành vi mặc định của form

		// Kiểm tra nếu giỏ hàng trống
		if (cart.length === 0) {
			alert('Giỏ của bạn trống trơn. Vui lòng thêm một số sản phẩm trước khi đặt hàng.');
			return;
		}

		// Lấy thông tin từ form
		const name = $('#name').val();
		const email = $('#email').val();
		const address = $('#address').val();

		// Kiểm tra nếu thông tin không đầy đủ
		if (!name || !email || !address) {
			alert('Xin vui lòng điền đầy đủ thông tin vào các ô bắt buộc!');
			return;
		}

		// Kiểm tra nếu email không hợp lệ
		if (!isValidEmail(email)) {
			alert('Email không hợp lệ. Vui lòng kiểm tra lại!');
			return;
		}

		// Lưu thông tin đơn hàng vào localStorage
		const order = {
			name: name,
			email: email,
			address: address,
			items: cart
		};
		localStorage.setItem('order', JSON.stringify(order));

		// Xác nhận thông tin đơn hàng
		const confirmMessage = `Xác nhận thông tin đơn hàng:\n\nTên: ${name}\nEmail: ${email}\nĐịa chỉ: ${address}\n\nTiếp tục đến trang thanh toán?`;
		if (confirm(confirmMessage)) {
			// Chuyển hướng đến trang thanh toán
			window.location.href = 'payment.html';
		}
	});
});
