import httpAxios from "../httpAxios";

function getList()
{
    return httpAxios.get("order/index")
}

function getById(id)
{
    return httpAxios.get(`order/show/${id}`)

}
function getList1()
{
    return httpAxios.get("order/trash")
}

function deleteOrder(id)
{
    return httpAxios.post(`order/delete/${id}`)
}
function destroy(id)
{
    return httpAxios.delete(`order/destroy/${id}`)
}
  
function restore(id) {
    return httpAxios.post(`order/restore/${id}`);
}
function storeexport(data)
{
    return httpAxios.post(`order/storeexport`,data);
}
function dathang (data) {
    return httpAxios.post(`order/dathang`,data);
  }
  
  function productorder(id) {
    return httpAxios.get(`order/productorder/${id}`);
  }


const OrderService = {
    getList:getList,
    getList1:getList1,
    getById:getById,
    deleteOrder:deleteOrder,
    destroy:destroy,
    restore:restore,
    storeexport:storeexport,
    dathang:dathang,
    
    productorder:productorder

}
export default OrderService;