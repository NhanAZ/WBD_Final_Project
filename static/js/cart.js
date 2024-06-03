$(document).ready(function () {
	let cart = JSON.parse(localStorage.getItem('cart')) || [];

	function createRow(item) {
		return `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger remove-product" data-id="${item.id}">Xóa</button>
                </td>
            </tr>
        `;
	}

	function calculateTotal(cart) {
		return cart.reduce((total, item) => total + item.price, 0);
	}

	function renderCart() {
		const cartItems = $('#cart-items');
		cartItems.empty();
		cartItems.append(cart.map(createRow).join(''));
		$('#cart-total').text(`$${calculateTotal(cart).toFixed(2)}`);
	}

	renderCart();

	$('#cart-items').on('click', '.remove-product', function () {
		const itemId = $(this).data('id');
		cart = cart.filter(i => i.id !== itemId);
		localStorage.setItem('cart', JSON.stringify(cart));
		renderCart();
	});
});
