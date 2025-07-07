import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef();
  const { fetchUserAddCart } = useContext(Context);
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddCart();
  };
  const fetchData = async () => {
    setLoading(true);
    const categoryproduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryproduct?.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container  mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-bold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6  overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          onClick={scrollLeft}
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={scrollRight}
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
        >
          <FaAngleRight />
        </button>
        {loading
          ? // loading style

            // <div className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-600">
            //   <div className="animate-spin w-6 h-6 mx-auto"></div>
            // </div>
            loadingList.map((product, index) => {
              return (
                <div
                  className="w-full max-w-[280px] md:min-w-[320px] min-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                  key={index}
                >
                  <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px] animate-pulse">
                    {/* <img
                      src={product.productImage[0]}
                      alt=""
                      className="object-scale-down h-full hover:scale-125"
                    /> */}
                  </div>
                  <div className="p-4 grid w-full gap-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 bg-slate-200 animate-pulse rounded-2xl">
                      {/* {product?.productName} */}
                    </h2>
                    <p className="capitalize text-slate-500  p-1 bg-slate-200 animate-pulse rounded-2xl">
                      {/* {product?.category} */}
                    </p>
                    <div className=" flex gap-3 w-full">
                      <p className="text-red-600 font-medium  p-1 bg-slate-200 w-full animate-pulse rounded-2xl">
                        {/* {displayINRCurrency(product?.sellingPrice)} */}
                      </p>
                      <p className="text-slate-500 line-through  p-1 bg-slate-200 w-full animate-pulse rounded-2xl">
                        {/* {displayINRCurrency(product?.price)} */}
                      </p>
                    </div>
                    <button className=" text-sm text-white px-2  py-1 px-3 rounded-full bg-slate-200 animate-pulse">
                      {/* Add to Card */}
                    </button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"product/" + product._id}
                  className="w-full max-w-[280px] md:min-w-[320px] min-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                  key={index}
                >
                  <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]">
                    <img
                      src={product.productImage[0]}
                      alt=""
                      className="object-scale-down h-full hover:scale-125"
                    />
                  </div>
                  <div className="p-4 grid">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.category}
                    </p>
                    <div className=" flex gap-3">
                      <p className="text-red-600 font-medium">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    <button
                      className=" text-sm bg-red-600 hover:bg-red-700 text-white px-2  py-1 px-3 rounded-full"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Card
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
