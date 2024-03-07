import httpAxios from "../httpAxios";

function getList()
{
    return httpAxios.get("banner/index")
}

function getById(id)
{
    return httpAxios.get(`banner/show/${id}`)

}
function getList1()
{
    return httpAxios.get("banner/trash")
}
function store(data)
{
    return httpAxios.post("banner/store",data)
}
function deleteBanner(id)
{
    return httpAxios.post(`banner/delete/${id}`)
}
function destroy(id)
{
    return httpAxios.delete(`banner/destroy/${id}`)
}
function update(id, data){
    return httpAxios.post(`banner/update/${id}`,data);
  }
  
  function restore(id) {
    return httpAxios.post(`banner/restore/${id}`);
}
function updateStatus(id, updateStatus){
    return httpAxios.post(`banner/update/${id}`,updateStatus);
  }
const BannerService = {
    getById :getById,
    getList :getList,
    store:store,
    destroy:destroy,
    update:update,
    deleteBanner:deleteBanner,
    getList1:getList1,
    restore: restore,
    updateStatus:updateStatus,
    

}
export default BannerService;