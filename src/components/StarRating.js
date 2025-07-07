import React from "react";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const decimalPart = rating % 1;
  // console.log("Decimal Part: ", decimalPart);
  const totalStars = 5;

  // Partial Star Width Calculation
  let partialWidth = 0;
  if (decimalPart > 0 && decimalPart <= 0.25) {
    partialWidth = 10; // ¼ shading
  } else if (decimalPart > 0.25 && decimalPart <= 0.5) {
    partialWidth = 30; // ½ shading
  } else if (decimalPart > 0.5 && decimalPart <= 0.75) {
    partialWidth = 50; // ¾ shading
  } else if (decimalPart > 0.75) {
    partialWidth = 100; // Full Star (Instead of partial)
  }

  return (
    <div style={{ display: "flex", fontSize: "24px" }}>
      {/* ⭐ full star */}
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} style={{ color: "#FFD700" }}>
          ★
        </span>
      ))}

      {/* 🌟 Partial Star (Shaded Effect) */}
      {decimalPart > 0 && (
        <span
          style={{
            position: "relative",
            display: "inline-block",
            width: "24px", // Star size
            height: "24px",
          }}
        >
          <span style={{ color: "#ccc" }}>★</span> {/* Gray Star */}
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${partialWidth}%`, // Apply partial shading
              overflow: "hidden",
              color: "#FFD700",
              whiteSpace: "nowrap",
            }}
          >
            ★
          </span>
        </span>
      )}

      {/* 🔲 காலியான நட்சத்திரங்கள் */}
      {[...Array(totalStars - fullStars - (decimalPart > 0 ? 1 : 0))].map(
        (_, i) => (
          <span key={i + fullStars + 1} style={{ color: "#ccc" }}>
            ★
          </span>
        )
      )}
    </div>
  );
};

export default StarRating;
