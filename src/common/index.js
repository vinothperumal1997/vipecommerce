// const backendDomain = "http://localhost:8081";
const backendDomain = "https://vipecommerce-bakend.vercel.app";

const SummaryApi = {
  signUP: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIN: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/userdetails`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomain}/api/userlogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain}/api/allusers`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/updateuser`,
    method: "put",
  },
  uploadproduct: {
    url: `${backendDomain}/api/uploadproduct`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomain}/api/allproducts`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomain}/api/updateproduct`,
    method: "put",
  },
  categoryProduct: {
    url: `${backendDomain}/api/getcategory`,
    method: "post",
  },
  categoryWiseProduct: {
    url: `${backendDomain}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomain}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomain}/api/addtocart`,
    method: "post",
  },
  cartProductCount: {
    url: `${backendDomain}/api/countaddtocart`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomain}/api/viewCart-products`,
    method: "get",
  },

  updateCartProduct: {
    url: `${backendDomain}/api/update-cart`,
    method: "put",
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/remove-cart`,
    method: "delete",
  },
  sellerSignUp: {
    url: `${backendDomain}/api/sellersignup`,
    method: "post",
  },
  sellerSignIn: {
    url: `${backendDomain}/api/sellersignin`,
    method: "post",
  },
};
export default SummaryApi;
