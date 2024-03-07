import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';

const MomoPayment = ({ totalAmount, onSuccess, onError }) => {
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    // Gọi API của bạn để tạo thông tin đơn hàng trên server
    // Lưu ý: Dữ liệu orderInfo cần phải được tạo và trả về từ server
    const createOrder = async () => {
      try {
        // Gọi API để lấy thông tin đơn hàng từ server
        const response = await fetch('http://localhost/PhanHien_DoAnChuyenDeThucTap/laravelBackend/public/api/order/dathang', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            totalAmount: totalAmount,
            // Các thông tin khác cần cho đơn hàng
          }),
        });

        const data = await response.json();

        // Set thông tin đơn hàng cho state
        setOrderInfo(data.orderInfo);
      } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error);
        onError();
      }
    };

    createOrder();
  }, [totalAmount, onError]);

  const handlePayment = () => {
    // Gọi API của bạn để tạo mã thanh toán từ server
    // Lưu ý: Mã thanh toán cần phải được tạo và trả về từ server
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: orderInfo.orderId,
        totalAmount: totalAmount,
        // Các thông tin khác cần cho thanh toán
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Chuyển hướng người dùng đến trang thanh toán của Momo
        window.location.href = data.payUrl;
      })
      .catch((error) => {
        console.error('Lỗi khi tạo mã thanh toán:', error);
        onError();
      });
  };

  return (
    <div>
      <h2>Thông tin đơn hàng</h2>
      {orderInfo && (
        <>
          <p>Mã đơn hàng: {orderInfo.orderId}</p>
          <p>Tổng tiền: {totalAmount} VND</p>
          <p>Thời gian tạo đơn: <Moment format="YYYY-MM-DD HH:mm:ss">{orderInfo.createdAt}</Moment></p>
          <button onClick={handlePayment}>Thanh toán bằng Momo</button>
        </>
      )}
    </div>
  );
};

export default MomoPayment;
