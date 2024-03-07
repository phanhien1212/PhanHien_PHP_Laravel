import httpAxios from "../httpAxios";

function getList()
{
    return httpAxios.get("user/index")
}
function getList1()
{
    return httpAxios.get("user/trash")
}
function register(formData)
{
    return httpAxios.post(`register`, formData)
}
function login(formData)
{
    return httpAxios.post(`login`, formData)
}
function getById(id)
{
    return httpAxios.get(`user/show/${id}`)

}
function store(data)
{
    return httpAxios.post("user/store",data)
}
function deleteUser(id)
{
    return httpAxios.post(`user/delete/${id}`)
}
function destroy(id)
{
    return httpAxios.delete(`user/destroy/${id}`)
}
function update(id, data){
    return httpAxios.post(`user/update/${id}`,data);
  }
  
  function restore(id) {
    return httpAxios.post(`user/restore/${id}`);
}

function updatepassword(id) {
    return httpAxios.post(`updatepassword/${id}`);
}


const UserService = {
    updatepassword:updatepassword,
    register:register,
    login:login,
    getList:getList,
    getList1:getList1,
    getById:getById,
    store:store,
    deleteUser:deleteUser,
    destroy:destroy,
    update:update,
    restore:restore

   

}
export default UserService;