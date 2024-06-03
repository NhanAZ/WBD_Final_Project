$(document).ready(function () {
	const order = JSON.parse(localStorage.getItem('order'));

	function isValidPaymentInfo(cardNumber, expiryDate, cvv) {
		return cardNumber && expiryDate && cvv;
	}

	function renderOrderSummary() {
		const orderSummary = $('#order-summary');
		orderSummary.empty();
		let orderTotal = 0;
		order.items.forEach(item => {
			const row = `
                <tr>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                </tr>
            `;
			orderSummary.append(row);
			orderTotal += item.price;
		});
		$('#order-total').text(`$${orderTotal.toFixed(2)}`);
	}

	renderOrderSummary();

	$('#payment-form').submit(event => {
		event.preventDefault();

		const cardNumber = $('#card-number').val().trim();
		const expiryDate = $('#expiry-date').val().trim();
		const cvv = $('#cvv').val().trim();

		if (!isValidPaymentInfo(cardNumber, expiryDate, cvv)) {
			alert('Thông tin thanh toán không hợp lệ. Vui lòng kiểm tra lại!');
			return;
		}

		const confirmMessage = `Xác nhận thông tin thanh toán:\n\nSố thẻ: ${cardNumber}\nNgày hết hạn: ${expiryDate}\nCVV: ${cvv}\n\nTiếp tục thanh toán?`;
		if (!confirm(confirmMessage)) {
			return;
		}

		alert('Thanh toán thành công!');

		localStorage.removeItem('order');
		localStorage.removeItem('cart');

		location.reload();
	});
});
