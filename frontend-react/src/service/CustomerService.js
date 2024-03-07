import httpAxios from "../httpAxios";

function getList()
{
    return httpAxios.get("customer/index")
}

function getById(id)
{
    return httpAxios.get(`customer/show/${id}`)

}
function getList1()
{
    return httpAxios.get("customer/trash")
}
function store(data)
{
    return httpAxios.post("customer/store",data)
}
function deleteCustomer(id)
{
    return httpAxios.post(`customer/delete/${id}`)
}
function destroy(id)
{
    return httpAxios.delete(`customer/destroy/${id}`)
}
function update(id, data){
    return httpAxios.post(`customer/update/${id}`,data);
  }
  
  function restore(id) {
    return httpAxios.post(`customer/restore/${id}`);
}



const CustomerService = {
    getList:getList,
    getList1:getList1,
    getById:getById,
    store:store,
    deleteCustomer:deleteCustomer,
    destroy:destroy,
    update:update,
    restore:restore
   

}
export default CustomerService;