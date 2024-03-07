import axios from "axios";
const httpAxios = axios.create({
    baseURL:'http://localhost/PhanHien_DoAnChuyenDeThucTap/laravelBackend/public/api/',
    headers:{'X-Custom-Header':'foobar'}
});
 
export default httpAxios;