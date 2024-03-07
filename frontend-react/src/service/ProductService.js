import httpAxios from "../httpAxios";



const ProductService = {

    getList: () => {
        return httpAxios.get("product/index")
    },

    getById: (id) => {
        return httpAxios.get(`product/show/${id}`)

    },
    getBySlug: (slug) => {
        return httpAxios.get(`product/showSlug/${slug}`)

    },
    getList1: () => {
        return httpAxios.get("product/trash")
    },
    store: (data) => {
        return httpAxios.post("product/store", data)
    },
    deleteProduct: (id) => {
        return httpAxios.post(`product/delete/${id}`)
    },
    destroy: (id) => {
        return httpAxios.delete(`product/destroy/${id}`)
    },
    update: (id, data) => {
        return httpAxios.post(`product/update/${id}`, data);
    },
    restore: (id) => {
        return httpAxios.post(`product/restore/${id}`);
    },
    productall: () => {
        return httpAxios.get(`product/productall`);
    },
    productlimit: (limit) => {
        return httpAxios.get(`product/productlimit/${limit}`);
    },
    productnew: (limit) => {
        return httpAxios.get(`product/productnew/${limit}`);
    },
    productsale: (limit) => {
        return httpAxios.get(`product/productsale/${limit}`);
    },
    producthotbuy: (limit) => {
        return httpAxios.get(`product/producthotbuy/${limit}`);
    },
    storesale: (data) => {
        return httpAxios.post(`product/storesale`,data);
    },
    
    getListSale: () => {
        return httpAxios.get(`product/indexsale`);
    },
    productsaleadmin: () => {
        return httpAxios.get(`product/productsaleadmin`);
    },
    productstore: () => {
        return httpAxios.get(`product/productstore`);
    },
    storeproductstore: (data) => {
        return httpAxios.post(`product/storeproductstore`,data);
    },
    search: (keyword) => {
        return httpAxios.get(`product/search/${keyword}`);
      },

}
export default ProductService;
