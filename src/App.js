import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    // Change "fetchuserDetails" to "fetchUserDetails"
    try {
      // console.log("Fetching user details from:", SummaryApi.current_user.url);

      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dataApi = await response.json();

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      } else {
        console.error("API Error:", dataApi.message);
      }
    } catch (error) {
      console.error("Fetch failed:", error.message);
    }
  };
  const fetchUserAddCart = async () => {
    const response = await fetch(SummaryApi.cartProductCount.url, {
      method: SummaryApi.cartProductCount.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataApi = await response.json();
    setCartProductCount(dataApi?.count);
  };
  useEffect(() => {
    fetchUserDetails();
    fetchUserAddCart();
  }, []);
  return (
    <>
      <Context.Provider
        value={{ fetchUserDetails, cartProductCount, fetchUserAddCart }}
      >
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          pauseOnHover={false}
          toastStyle={{
            bottom: "200px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <Header />

        <main className=" min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
};

export default App;
