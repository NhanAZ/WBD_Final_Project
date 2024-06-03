$(document).ready(function () {
	const cart = JSON.parse(localStorage.getItem('cart')) || [];

	function isValidEmail(email) {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	$('#checkout-form').submit(function (event) {
		event.preventDefault();

		if (cart.length === 0) {
			alert('Giỏ của bạn trống trơn. Vui lòng thêm một số sản phẩm trước khi đặt hàng.');
			return;
		}

		const name = $('#name').val().trim();
		const email = $('#email').val().trim();
		const address = $('#address').val().trim();

		if (!name || !email || !address) {
			alert('Xin vui lòng điền đầy đủ thông tin vào các ô bắt buộc!');
			return;
		}

		if (!isValidEmail(email)) {
			alert('Email không hợp lệ. Vui lòng kiểm tra lại!');
			return;
		}

		const order = {
			name: name,
			email: email,
			address: address,
			items: cart
		};
		localStorage.setItem('order', JSON.stringify(order));

		const confirmMessage = `Xác nhận thông tin đơn hàng:\n\nTên: ${name}\nEmail: ${email}\nĐịa chỉ: ${address}\n\nTiếp tục đến trang thanh toán?`;
		if (confirm(confirmMessage)) {
			window.location.href = 'payment.html';
		}
	});
});
