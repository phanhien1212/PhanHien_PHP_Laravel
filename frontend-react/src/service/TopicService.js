import httpAxios from "../httpAxios";

function getList()
{
    return httpAxios.get("topic/index")
}

function getById(id)
{
    return httpAxios.get(`topic/show/${id}`)

}
function getList1()
{
    return httpAxios.get("topic/trash")
}
function store(data)
{
    return httpAxios.post("topic/store",data)
}
function deleteBrand(id)
{
    return httpAxios.post(`topic/delete/${id}`)
}
function destroy(id)
{
    return httpAxios.delete(`topic/destroy/${id}`)
}
function update(id, data){
    return httpAxios.post(`topic/update/${id}`,data);
  }
  function restore(id) {
    return httpAxios.post(`topic/restore/${id}`);
}
const TopicService = {
    getById :getById,
    getList :getList,
    store:store,
    destroy:destroy,
    update:update,
    delete:deleteBrand,
    getList1:getList1,
    restore: restore,

}
export default TopicService;