import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const CategoryWiseProductDispaly = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
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

  return (
    <div className="container  mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-bold py-4">{heading}</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,320px))]  justify-between  md:gap-6  overflow-x-scroll scrollbar-none transition-all">
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div
                  className="w-full max-w-[280px]   md:min-w-[320px] min-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow "
                  key={index}
                >
                  <div className="bg-slate-200 h-48 p-2 min-w-[280px] md:min-w-[145px] flex justify-center items-center  animate-pulse ">
                    {/* <img
                      src={product.productImage[0]}
                      alt=""
                      className="object-scale-down h-full hover:scale-125 transition-all mix-blend-multiply"
                    /> */}
                  </div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black py-2  p-1 rounded-3xl animate-pulse bg-slate-200 ">
                      {/* {product?.productName} */}
                    </h2>
                    <p className="capitalize text-slate-500  p-1 rounded-3xl animate-pulse  py-2 bg-slate-200">
                      {/* {product?.category} */}
                    </p>
                    <div className=" flex gap-3 w-full">
                      <p className="text-red-600 font-medium  p-1 w-full rounded-3xl animate-pulse  py-2 bg-slate-200">
                        {/* {displayINRCurrency(product?.sellingPrice)} */}
                      </p>
                      <p className="text-slate-500 line-through p-1  py-2 w-full rounded-3xl animate-pulse bg-slate-200">
                        {/* {displayINRCurrency(product?.price)} */}
                      </p>
                    </div>
                    <button className=" text-sm  text-white px-2  py-2 px-3 rounded-full animate-pulse bg-slate-200">
                      {/* Add to Card */}
                    </button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"product/" + product?._id}
                  className="w-full max-w-[280px]  md:min-w-[320px] min-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow  "
                  key={index}
                >
                  <div className="bg-slate-200 h-48 p-2 min-w-[280px] md:min-w-[145px] flex justify-center items-center ">
                    <img
                      src={product.productImage[0]}
                      alt=""
                      className="object-scale-down h-full hover:scale-125 transition-all mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 grid gap-3">
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

export default CategoryWiseProductDispaly;
