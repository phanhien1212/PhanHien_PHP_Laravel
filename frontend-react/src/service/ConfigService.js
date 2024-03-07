import httpAxios from "../httpAxios";

function getList()
{
    return httpAxios.get("config/index")
}
function store(data)
{
    return httpAxios.post("config/store",data)
}

const ConfigService = {
    getList:getList,
    store:store,
    
   

}
export default ConfigService;