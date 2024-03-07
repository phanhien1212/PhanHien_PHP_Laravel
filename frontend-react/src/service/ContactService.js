import httpAxios from "../httpAxios";

function getList()
{
    return httpAxios.get("contact/index")
}
function getById(id)
{
    return httpAxios.get(`contact/show/${id}`)
}
function getList1()
{
    return httpAxios.get("contact/trash")
}
function reply(id, data)
{
    return httpAxios.post(`contact/reply/${id}`,data)
}
function deleteContact(id)
{
    return httpAxios.post(`contact/delete/${id}`)
}
function destroy(id)
{
    return httpAxios.delete(`contact/destroy/${id}`)
}
  function restore(id) {
    return httpAxios.post(`contact/restore/${id}`);
}
const ContactService = {
    getById :getById,
    getList :getList,
    getList1:getList1,
    reply:reply,
    destroy:destroy,
    deleteContact:deleteContact,
    restore: restore,
}
export default ContactService;