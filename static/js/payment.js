// Khi tài liệu đã sẵn sàng
$(document).ready(function() {
    // Lấy dữ liệu đơn hàng từ localStorage
    const order = JSON.parse(localStorage.getItem('order'));

    // Hàm kiểm tra tính hợp lệ của thông tin thanh toán
    function isValidPaymentInfo(cardNumber, expiryDate, cvv) {
        // Thêm logic kiểm tra của bạn ở đây
        return cardNumber && expiryDate && cvv;
    }

    // Hàm hiển thị thông tin đơn hàng
    function renderOrderSummary() {
        const orderSummary = $('#order-summary'); // Lấy phần tử chứa thông tin đơn hàng
        orderSummary.empty(); // Xóa tất cả thông tin đơn hàng hiện tại
        let orderTotal = 0; // Khởi tạo tổng giá trị đơn hàng
        order.items.forEach(item => { // Duyệt qua từng sản phẩm trong đơn hàng
            const row = `
            <tr>
              <td>${item.name}</td> <!-- Tên sản phẩm -->
              <td>$${item.price.toFixed(2)}</td> <!-- Giá sản phẩm -->
            </tr>
          `;
            orderSummary.append(row); // Thêm thông tin sản phẩm vào thông tin đơn hàng
            orderTotal += item.price * item.quantity; // Cập nhật tổng giá trị đơn hàng
        });
        $('#order-total').text(`$${orderTotal.toFixed(2)}`); // Hiển thị tổng giá trị đơn hàng
    }

    // Hiển thị thông tin đơn hàng khi tài liệu đã sẵn sàng
    renderOrderSummary();

    // Khi người dùng gửi form thanh toán
    $('#payment-form').submit(event => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form

        // Lấy thông tin từ form
        const cardNumber = $('#card-number').val();
        const expiryDate = $('#expiry-date').val();
        const cvv = $('#cvv').val();

        // Kiểm tra nếu thông tin thanh toán không hợp lệ
        if (!isValidPaymentInfo(cardNumber, expiryDate, cvv)) {
            alert('Thông tin thanh toán không hợp lệ. Vui lòng kiểm tra lại!');
            return;
        }

        // Xác nhận thông tin thanh toán
        const confirmMessage = `Xác nhận thông tin thanh toán:\n\nSố thẻ: ${cardNumber}\nNgày hết hạn: ${expiryDate}\nCVV: ${cvv}\n\nTiếp tục thanh toán?`;
        if (!confirm(confirmMessage)) {
            return;
        }

        // Thực hiện logic để xử lý thanh toán
        alert('Thanh toán thành công!');

        // Xóa dữ liệu đơn hàng và giỏ hàng sau khi thanh toán thành công
        localStorage.removeItem('order');
        localStorage.removeItem('cart');

        // Tải lại trang
        location.reload();
    });
});
