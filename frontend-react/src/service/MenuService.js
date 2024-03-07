import httpAxios from "../httpAxios";

function getList()
{
    return httpAxios.get("menu/index")
}
function getById(id)
{
    return httpAxios.get(`menu/show/${id}`)
}
function getList1()
{
    return httpAxios.get("menu/trash")
}
function destroy(id)
{
    return httpAxios.delete(`menu/destroy/${id}`)
}
function store(data)
{
    return httpAxios.post("menu/store",data)
}
function deleteMenu(id)
{
    return httpAxios.post(`menu/delete/${id}`)
}
function update(id, data){
    return httpAxios.post(`menu/update/${id}`,data);
  }
  function restore(id) {
    return httpAxios.post(`menu/restore/${id}`);
}
const MenuService = {
    getById :getById,
    getList :getList,
    store : store,
    update:update,
    getList1:getList1,
    destroy:destroy,
    deleteMenu:deleteMenu,
    restore:restore,

}
export default MenuService;