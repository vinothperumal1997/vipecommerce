import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
      <HorizontalCardProduct
        category={"earphones"}
        heading={"Popular's Earphones"}
      />
      <VerticalCardProduct category={"mobiles"} heading={"Popular's Mobiles"} />
      <VerticalCardProduct category={"watches"} heading={"Popular's watches"} />
      <VerticalCardProduct category={"televisions"} heading={"Popular's TV"} />
      <VerticalCardProduct category={"camera"} heading={"Camera"} />
      {/* refrigerator */}
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
      {/* speakers */}
      <VerticalCardProduct category={"speakers"} heading={"Speakers"} />
    </div>
  );
};

export default Home;
