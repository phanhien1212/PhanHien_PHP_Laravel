import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import OrderService from "../../../service/OrderService";
import ProductService from "../../../service/ProductService";
import { urlImage } from "../../../config";
const ShowOrder = () => {
    const { id } = useParams();
  const [load, setLoad] = useState(Date.now());
  const [order, setOrder] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);
  const [delivery_name, setName] = useState("");
  const [delivery_phone, setPhone] = useState("");
  const [delivery_email, setEmail] = useState("");
  const [delivery_address, setAddress] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await OrderService.getById(id);
        const resultOrderDetail = await OrderService.productorder(id);
        const resultOrder = result.data.order;
        setOrder(result.data.order);
        setName(resultOrder.delivery_name);
        setAddress(resultOrder.delivery_address);
        setPhone(resultOrder.delivery_phone);
        setEmail(resultOrder.delivery_email);
        setOrderDetails(resultOrderDetail.data.order_details);
        console.log(result.data.order);
        console.log(resultOrderDetail.data.order_details);
        const detailsWithProductInfo = await Promise.all(
            resultOrderDetail.data.order_details.map(async (detail) => {
              const productInfo = await getProductInfo(detail.product_id);
              return {
                ...detail,
                product: productInfo,
              };
            })
          );
  
          setOrderDetails(detailsWithProductInfo);
          console.log(detailsWithProductInfo);
        
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    fetchData();
  }, [id, load]);

  const getProductInfo = async (productId) => {
    try {
      const productInfo = await ProductService.getById(productId);
      return productInfo.data.product;
    } catch (error) {
      console.error("Error fetching product data:", error);
      return null;
    }
  };
  // Ngoài phần JSX
  const calculateTotalAmount = () => {
    let totalAmount = 0;

    orderDetails.forEach((productDetail) => {
      totalAmount += productDetail.amount;
    });

    return totalAmount;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Chi tiết đơn hàng</h1>
                <div className="mt-1 text-end">
                    <a className="btn btn-sm btn-primary" href="order_index.html">
                        <i className="fa fa-arrow-left" /> Về danh sách
                    </a>
                </div>
            </section>
            <section className="content-body my-2">
                <h3>Thông tin khách hàng</h3>
                <div className="row">
                    <div className="col-md">
                        <label><strong>Họ tên (*)</strong></label>
                        <input type="text" value={delivery_name}
              onChange={(e) => setName(e.target.value)} name="name" defaultValue className="form-control" readOnly />
                    </div>
                    <div className="col-md">
                        <label><strong>Email (*)</strong></label>
                        <input type="text" value={delivery_email}
              onChange={(e) => setEmail(e.target.value)} name="email" defaultValue className="form-control" readOnly />
                    </div>
                    <div className="col-md">
                        <label><strong>Điện thoại (*)</strong></label>
                        <input type="text" value={delivery_phone}
              onChange={(e) => setPhone(e.target.value)} name="phone" defaultValue className="form-control" readOnly />
                    </div>
                    <div className="col-md-5">
                        <label><strong>Địa chỉ (*)</strong></label>
                        <input type="text" value={delivery_address}
              onChange={(e) => setAddress(e.target.value)} name="address" defaultValue className="form-control" readOnly />
                    </div>
                </div>
                <h3>Chi tiết giỏ hàng</h3>
                <div className="row my-2">
                    <div className="col-3">
                        Tổng tiền: <strong>{calculateTotalAmount()} đ</strong>
                    </div>
                    <div className="col-3">
                        Ngày đặt: <strong>{formatDate(order.created_at)}</strong>
                    </div>
                    <div className="col-3">
                        Hình thức đặt: <strong>{order.type}</strong>
                    </div>
                    <div className="col-3">
                        Trạng thái:{" "}
                        <strong>
                        {order.status === 2 ? "Chưa xác nhận" : "Đã xác nhận"}
                        </strong>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ width: 90 }}>Hình ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th style={{ width: 160 }} className="text-center">Giá</th>
                                    <th style={{ width: 90 }} className="text-center">Số lượng</th>
                                    <th style={{ width: 160 }} className="text-center">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                            {orderDetails.map((productDetail, index) => (
                                    <tr>
                                        <td>
                                        <img
                                            className="img-fluid"
                                            src={
                                            urlImage +
                                            "product/" +
                                            (productDetail.product
                                                ? productDetail.product.image
                                                : "")
                                            }
                                            alt="product.jpg"
                                        />
                                        </td>
                                        <td>
                                        {productDetail.product
                                            ? productDetail.product.name
                                            : "Tên sản phẩm không khả dụng"}
                                        </td>
                                        <td className="text-right">{productDetail.price}</td>
                                        <td className="text-center">{productDetail.qty}</td>
                                        <td className="text-right">{productDetail.amount}</td>
                                    </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default ShowOrder;