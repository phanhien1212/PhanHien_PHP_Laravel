import httpAxios from "../httpAxios";

function getList()
{
    return httpAxios.get("post/index")
}

function getById(id)
{
    return httpAxios.get(`post/show/${id}`)

}
function getList1()
{
    return httpAxios.get("post/trash")
}
function store(data)
{
    return httpAxios.post("post/store",data)
}
function deletePost(id)
{
    return httpAxios.post(`post/delete/${id}`)
}
function destroy(id)
{
    return httpAxios.delete(`post/destroy/${id}`)
}
function update(id, data){
    return httpAxios.post(`post/update/${id}`,data);
  }
  
  function restore(id) {
    return httpAxios.post(`post/restore/${id}`);
}
function updateStatus(id, updateStatus){
    return httpAxios.post(`post/update/${id}`,updateStatus);
  }
const PostService = {
    getById :getById,
    getList :getList,
    store:store,
    destroy:destroy,
    update:update,
    delete:deletePost,
    getList1:getList1,
    restore: restore,
    updateStatus:updateStatus, 

}
export default PostService;