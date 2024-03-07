import httpAxios from "../httpAxios";

function getList()
{
    return httpAxios.get("page/index")
}

function getById(id)
{
    return httpAxios.get(`page/show/${id}`)

}
function getList1()
{
    return httpAxios.get("page/trash")
}
function store(data)
{
    return httpAxios.post("page/store",data)
}
function deletePage(id)
{
    return httpAxios.post(`page/delete/${id}`)
}
function destroy(id)
{
    return httpAxios.delete(`page/destroy/${id}`)
}
function update(id, data){
    return httpAxios.post(`page/update/${id}`,data);
  }
  function restore(id) {
    return httpAxios.post(`page/restore/${id}`);
}
const PageService = {
    getById :getById,
    getList :getList,
    store:store,
    destroy:destroy,
    update:update,
    deletePage:deletePage,
    getList1:getList1,
    restore: restore,

}
export default PageService;