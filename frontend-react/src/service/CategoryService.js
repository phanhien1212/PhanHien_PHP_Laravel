import httpAxios from "../httpAxios";

function getList()
{
    return httpAxios.get("category/index")
}

function getById(id)
{
    return httpAxios.get(`category/show/${id}`)

}

function getList1()
{
    return httpAxios.get("category/trash")
}
function store(data)
{
    return httpAxios.post("category/store",data)
}
function deleteCategory(id)
{
    return httpAxios.post(`category/delete/${id}`)
}
function destroy(id)
{
    return httpAxios.delete(`category/destroy/${id}`)
}
function update(id, data){
    return httpAxios.post(`category/update/${id}`,data);
  }
  function restore(id) {
    return httpAxios.post(`category/restore/${id}`);
}
const CategoryService = {
    getById :getById,
    getList :getList,
    store:store,
    destroy:destroy,
    update:update,
    delete:deleteCategory,
    getList1:getList1,
    restore: restore,

}
export default CategoryService;