import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";
// import StarRating from "../components/StarRating";
import displayINRCurrency from "../helpers/displayCurrency";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategoryWiseProductDispaly from "../components/CategoryWiseProductDispaly";
import { FaShoppingCart } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    price: "",
    sellingPrice: "",
    description: "",
    availableStock: "",
  });
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const productimageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const { fetchUserAddCart } = useContext(Context);

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const fetchProductData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: params.id }),
    });
    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };
  useEffect(() => {
    fetchProductData();
  }, []);
  const handleMouseEnterProductImage = (imageURL) => {
    setActiveImage(imageURL);
  };
  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      // console.log("coordinate", left, top, width, height);
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );
  const handleZoomOutImage = () => {
    setZoomImage(false);
  };
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddCart();
  };
  return (
    <div
      className="container mx-auto p-4 "
      style={{ marginLeft: "2pc", marginRight: "2pc" }}
    >
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* product image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-6 ">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              className="w-full h-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleZoomOutImage}
            />
            {/* product zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px]  overflow-hidden   min-h-[400px] bg-slate-200 p-1 top-0 right-[-510px] z-10">
                <div
                  className="w-full h-full mix-blend-multiply scale-150 min-h-[400px] min-w-[400px]"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }% `,
                  }}
                ></div>
              </div>
            )}
            <div className="flex items-center gap-2 py-6 xl:py-4">
              <button
                className="border-2 border-yellow-600 rounded px-3 py-1 min-w-[120px] w-full hover:bg-yellow-600 hover:text-white font-medium flex items-center justify-center gap-1"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                <FaShoppingCart /> Add To Cart
              </button>
              <button className="border-2 border-orange-700 rounded px-3 py-1 min-w-[120px] w-full hover:bg-orange-600 hover:text-white font-medium flex items-center justify-center gap-1">
                <FaBolt /> Buy
              </button>
            </div>
          </div>
          <div className=" h-full ">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full py-8">
                {productimageListLoading.map((el, index) => {
                  return (
                    <div
                      className=" h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={"loadingImage" + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="">
                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full py-8 xl:py-2">
                  {data?.productImage?.map((imgURL, index) => {
                    return (
                      <div
                        className=" h-20 w-20 bg-slate-200 rounded p-1"
                        key={index}
                      >
                        <img
                          src={imgURL}
                          className="h-full w-full object-scale-down mix-blend-multiply cursor-pointer"
                          onMouseEnter={() =>
                            handleMouseEnterProductImage(imgURL)
                          }
                          onClick={() => handleMouseEnterProductImage(imgURL)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* product details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block"></p>
            <h2 className="bg-slate-200 animate-pulse text-2xl lg:text-4xl font-medium h-6 lg:h-8 w-full "></h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full"></p>
            <div className="text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full"></div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full">
              <p className="text-red-600 bg-slate-200 w-full"></p>
              <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
            </div>
            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full"></button>
              <button className="h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full"></button>
            </div>

            <div className="w-full">
              <p className="text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full"></p>
              <p className=" bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 py-10 xl:py-0">
            <p className="bg-red-200 text-red-600 px-2 rounded-full w-fit ">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl  font-medium capitalize ">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>
            {/* rateing star style */}
            <div className="text-red-600 flex items-center gap-1">
              {/* <StarRating rating={3.7} /> */}
              <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
                <span>3.7</span>
                <FaStar className="text-white" />
              </div>
              <div className="">
                <p className="text-slate-400">
                  1,42,324 Ratings & 5,112 Reviews
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-medium text-2xl lg:text-3xl my-1">
              <p className="text-red-600" ss>
                {displayINRCurrency(data.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayINRCurrency(data.price)}
              </p>
              <p className="text-lg text-green-700">
                {(
                  ((data.price - data.sellingPrice) / data.price) *
                  100
                ).toFixed(0)}
                % off
              </p>
            </div>
            {/* babk offer  */}

            <div className="leading-5 ">
              <p className="text-sm">Available offers</p>
              <p className="text-slate-400 text-sm flex items-center py-1 ">
                <span className="text-green-600 pe-3">
                  <FaTag />
                </span>
                <span className="text-red-600">Bank Offer</span> 10% Off on Bank
                of Baroda Mastercard debit card first time transaction, Terms
                and Condition apply
                <span className="text-red-600 hover:cursor-pointer ps-1">
                  {" "}
                  T&C
                </span>
              </p>
              <p className="text-slate-400 text-sm flex items-center  py-1">
                <span className="text-green-600 pe-3">
                  <FaTag />
                </span>
                <span className="text-red-600">Bank Offer</span> 10% Off on Bank
                of Baroda Mastercard debit card first time transaction, Terms
                and Condition apply
                <span className="text-red-600 hover:cursor-pointer ps-1">
                  {" "}
                  T&C
                </span>
              </p>
              <p className="text-slate-400 text-sm flex items-center ">
                <span className="text-green-600 pe-3">
                  <FaTag />
                </span>
                <span className="text-red-600">Bank Offer</span> 10% Off on
                First time transaction on Bank of Baroda Mastercard debit card
                <span className="text-red-600 hover:cursor-pointer ps-1">
                  {" "}
                  T&C
                </span>
              </p>
            </div>
            {/* <div className="flex items-center gap-2">
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] w-full hover:bg-red-600 hover:text-white font-medium ">
                Buy
              </button>
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] w-full hover:bg-red-600 hover:text-white font-medium ">
                Add To Cart
              </button>
            </div> */}
            <div className="">
              <p className="text-slate-600 font-medium my-1">Description :</p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>
      {/* product reviews */}
      {data.category && (
        <CategoryWiseProductDispaly
          category={data.category}
          heading={"Recommended Product"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
