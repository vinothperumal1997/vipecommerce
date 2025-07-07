import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyComponent = () => {
  const handleResponse = (responseData) => {
    if (responseData.error) {
      toast.error(responseData.message);
    }
  };

  // Example usage
  const simulateError = () => {
    const responseData = { error: true, message: "An error occurred!" };
    handleResponse(responseData);
  };

  return (
    <div>
      <button onClick={simulateError}>Simulate Error</button>
      <ToastContainer
        position="bottom-center"
        toastStyle={{
          bottom: "200px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
};

export default MyComponent;
