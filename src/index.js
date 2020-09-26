import { getListProductService, deleteProductByID, addProductService, editProductService, getProductByID, callapi } from "./utils/callapi.js";
import Product from "./models/product.js";

let arr = []
const renderHTML = () => {
    const contentHTML = `
    <div class="card text-white bg-dark">
    <div class="card-body">
      <h4 class="card-title">Danh sách sản phẩm</h4>
      <div class='container'>
        <div class="row">
          <div class="col-md-3">
            <input id="maSP" class="form-control" placeholder="Mã SP" disabled />
          </div>
          <div class="col-md-3">
            <input id="tenSP" class="form-control" placeholder="Tên SP" />
          </div>
          <div class="col-md-3">
            <input id="gia" class="form-control" placeholder="Giá" />
          </div>
          <div class="col-md-3">
            <input id="hinhAnh" class="form-control" placeholder="Link hình" />
          </div>
        </div>
        <br />
        <button id="btnThem" class="btn btn-success">Thêm sản phẩm</button>
        <button id="btnCapNhat" class="btn btn-success">Cap nhat</button>
      </div>
    </div>
  </div>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th>Mã SP</th>
          <th>Tên SP</th>
          <th>Giá </th>
          <th>Hình ảnh</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="tblDanhSachSanPham">

      </tbody>
    </table>
  </div>
    `;

    document.getElementById("root").innerHTML = contentHTML;
};

const renderListProduct = () => {
    // getListProductService()
    callapi("SanPham", "GET", null)
        .then((result) => {
            arr = result.data;
            const contentTbody = taoBang(result.data);
            document.getElementById("tblDanhSachSanPham").innerHTML = contentTbody;
            console.log(result.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

renderHTML();
renderListProduct();

const taoBang = (listProduct) => {
    let contentHTML = "";
    if (listProduct && listProduct.length > 0) {
        listProduct.map((product) => {
            contentHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.tenSP}</td>
                <td>${product.gia}</td>
                <td><img src=.${product.hinhAnh} width="50"></td>
                <td>
                    <button class="btn btn-info" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
            `;
        });
        return contentHTML;
    };
};

// const deleteProduct = (id) => {
//     getProductByID()
//         .then(() => {

//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }

window.deleteProduct = deleteProduct;
console.log(window);
function deleteProduct(id) {
    // deleteProductByID(id)
    callapi(`SanPham/${id}`, "DELETE", null)
        .then((result) => {
            // console.log(result);
            // const contentTbody = taoBang(arr.filter((product) => {
            //     return product.id !== result.data.id;
            // }));
            // document.getElementById("tblDanhSachSanPham").innerHTML = contentTbody;
            alert("Delete success");
            renderListProduct();
        })
        .catch((err) => {
            console.log(err);
        });
}

//THEM SP
document.getElementById("btnThem").addEventListener("click", function () {

    const ten = getEle("tenSP").value;
    const gia = getEle("gia").value;
    const hinhAnh = getEle("hinhAnh").value;
    const product = new Product("", ten, gia, hinhAnh);
    // addProductService(product)
    callapi("SanPham", "POST", product)
        .then(() => {
            renderListProduct();
        })
        .catch((err) => {
            console.log(err);
        });
})

function getEle(id) {
    return document.getElementById(id);
}

window.editProduct = editProduct;
function editProduct(id) {
    // getProductByID(id)
    callapi(`SanPham/${id}`, "GET", null)
        .then((product) => {
            getEle("maSP").value = product.data.id;
            getEle("tenSP").value = product.data.tenSP;
            getEle("gia").value = product.data.gia;
            getEle("hinhAnh").value = product.data.hinhAnh;
        })
        .catch((err) => {
            console.log(err);
        });
}

getEle("btnCapNhat").addEventListener("click", function () {
    const ma = getEle("maSP").value;
    const ten = getEle("tenSP").value;
    const gia = getEle("gia").value;
    const hinhAnh = getEle("hinhAnh").value;
    const product = new Product(ma, ten, gia, hinhAnh);
    editProductService(product)
        .then(() => {
            renderListProduct();
        })
        .catch((err) => {
            console.log(err);
        })
})