import httpAxios from "../httpAxios";

function getList()
{
    return httpAxios.get("brand/index")
}

function getById(id)
{
    return httpAxios.get(`brand/show/${id}`)

}
function getList1()
{
    return httpAxios.get("brand/trash")
}
function store(data)
{
    return httpAxios.post("brand/store",data)
}
function deleteBrand(id)
{
    return httpAxios.post(`brand/delete/${id}`)
}
function destroy(id)
{
    return httpAxios.delete(`brand/destroy/${id}`)
}
function update(id, data){
    return httpAxios.post(`brand/update/${id}`,data);
  }
  
  function restore(id) {
    return httpAxios.post(`brand/restore/${id}`);
}
function updateStatus(id, updateStatus){
    return httpAxios.post(`brand/update/${id}`,updateStatus);
  }
const BrandService = {
    getById :getById,
    getList :getList,
    store:store,
    destroy:destroy,
    update:update,
    delete:deleteBrand,
    getList1:getList1,
    restore: restore,
    updateStatus:updateStatus,
    

}
export default BrandService;