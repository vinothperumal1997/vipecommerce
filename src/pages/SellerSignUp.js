import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SellerRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [otherCategory, setOtherCategory] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    gstNumber: "",
    address: "",
    sellerPinCode: "",
    // bank details
    accountHolderName: "",
    upiId: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(SummaryApi.categoryProduct.url, {
          method: SummaryApi.categoryProduct.method,
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (result.success) {
          // Assuming result.data is an array of category objects.
          setCategories(result.data);
        } else {
          toast.error("Unable to fetch categories");
        }
      } catch (error) {
        toast.error("Error fetching categories");
      }
    };
    fetchCategories();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev) => ({ ...prev, profilePic: imagePic }));
  };

  // Toggle checkbox selection for a category
  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Toggle the "Other" option
  const handleOtherToggle = () => {
    // If "Other" is already selected, remove it and hide the input
    if (showOtherInput) {
      setShowOtherInput(false);
      setOtherCategory("");
      setSelectedCategories((prev) => prev.filter((cat) => cat !== "Other"));
    } else {
      // Show the input and add "Other" to selectedCategories
      setShowOtherInput(true);
      setSelectedCategories((prev) => [...prev, "Other"]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    // Build productCategories array
    let productCategories = [...selectedCategories];
    // If "Other" is selected and a value is provided, replace "Other" with the actual value.
    if (productCategories.includes("Other") && otherCategory.trim() !== "") {
      productCategories = productCategories.map((cat) =>
        cat === "Other" ? otherCategory.trim() : cat
      );
    }

    const payload = {
      ...data,
      productCategories,
    };

    // Remove confirmPassword from payload
    delete payload.confirmPassword;

    const compressedData = JSON.stringify(payload);

    try {
      const response = await fetch(SummaryApi.sellerSignUp.url, {
        method: SummaryApi.sellerSignUp.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: compressedData,
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        navigate("/login");
      } else if (result.error) {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <section id="seller-register">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-5xl mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img
                src={data.profilePic || "/defaultSellerIcon.gif"}
                alt="Seller Icon"
              />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            {/* Basic fields */}
            <div className="grid">
              <label>Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Phone:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={data.phone}
                  onChange={handleOnChange}
                  required
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="w-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div>
              <label>Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                  className="w-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div className="grid">
              <label>Business Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter business name"
                  name="businessName"
                  value={data.businessName}
                  onChange={handleOnChange}
                  required
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>GST Number:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter GST Number"
                  name="gstNumber"
                  value={data.gstNumber}
                  onChange={handleOnChange}
                  required
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Address:</label>
              <div className="bg-slate-100 p-2">
                <textarea
                  placeholder="Enter address"
                  name="address"
                  value={data.address}
                  onChange={handleOnChange}
                  required
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Seller Pin Code:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter seller pin code"
                  name="sellerPinCode"
                  value={data.sellerPinCode}
                  onChange={handleOnChange}
                  required
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>
            {/* Checkboxes for Category Selection */}
            <div className="grid">
              <label>Product Categories:</label>
              <div className="bg-slate-100 p-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((cat, index) => (
                  <div key={cat._id || index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`cat-${index}`}
                      value={cat.category}
                      checked={selectedCategories.includes(cat.category)}
                      onChange={() => toggleCategory(cat.category)}
                      className="mr-2"
                    />
                    <label htmlFor={`cat-${index}`}>{cat.category}</label>
                  </div>
                ))}
                {/* "Other" Option */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cat-other"
                    value="Other"
                    checked={selectedCategories.includes("Other")}
                    onChange={handleOtherToggle}
                    className="mr-2"
                  />
                  <label htmlFor="cat-other">Other</label>
                </div>
              </div>
              {/* Show custom input if "Other" is selected */}
              {showOtherInput && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter other category"
                    value={otherCategory}
                    onChange={(e) => setOtherCategory(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              )}
            </div>
            <h3 className="mt-4 text-lg font-semibold">Bank Details</h3>
            <div className="grid">
              <label>Account Holder Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter account holder name"
                  name="accountHolderName"
                  value={data.accountHolderName}
                  onChange={handleOnChange}
                  required
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>UPI ID:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  name="upiId"
                  value={data.upiId}
                  onChange={handleOnChange}
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Account Number:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter account number"
                  name="accountNumber"
                  value={data.accountNumber}
                  onChange={handleOnChange}
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>IFSC Code:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter IFSC code"
                  name="ifscCode"
                  value={data.ifscCode}
                  onChange={handleOnChange}
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Bank Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter bank name"
                  name="bankName"
                  value={data.bankName}
                  onChange={handleOnChange}
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Register
            </button>
          </form>
          <p className="my-5">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SellerRegister;
