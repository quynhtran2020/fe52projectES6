//uri="SanPham"
//
import { API_URL } from "./../config/index.js"

const callapi = (uri, method = "GET", data) => {
    return axios({
        url: API_URL + uri,
        method,
        data,
    });
};



const getListProductService = () => {
    return axios({
        url: "https://5f5f8142df620f00163e5d23.mockapi.io/SanPham",
        method: "GET",
    });
};

const getProductByID = (id) => {
    return axios({
        url: `https://5f5f8142df620f00163e5d23.mockapi.io/SanPham/${id}`,
        method: "GET",
    });
};

const deleteProductByID = (id) => {
    return axios({
        url: `https://5f5f8142df620f00163e5d23.mockapi.io/SanPham/${id}`,
        method: "DELETE",
    });
};

const addProductService = (product) => {
    return axios({
        url: `https://5f5f8142df620f00163e5d23.mockapi.io/SanPham`,
        method: "POST",
        data: product,
    });
}

const editProductService = (product) => {
    return axios({
        url: `https://5f5f8142df620f00163e5d23.mockapi.io/SanPham/${product.id}`,
        method: "PUT",
        data: product,
    });
}
export { getListProductService, deleteProductByID, addProductService, editProductService, getProductByID, callapi };