import React from "react";

const Logo = ({ w, h }) => {
  return (
    <svg
      width="200"
      height="60"
      viewBox="0 0 200 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="200" height="60" fill="#D32F2F" rx="10" />
      <text
        x="20"
        y="40"
        font-family="Arial, sans-serif"
        font-size="30"
        fill="white"
        font-weight="bold"
      >
        VIP
      </text>
      <text
        x="80"
        y="40"
        font-family="Arial, sans-serif"
        font-size="30"
        fill="#FFD700"
        font-weight="bold"
      >
        CART
      </text>
      <circle cx="160" cy="45" r="6" fill="white" />
      <circle cx="180" cy="45" r="6" fill="white" />
    </svg>
  );
};

export default Logo;
