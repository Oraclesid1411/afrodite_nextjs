// src/components/StatCard.jsx
import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div
      style={{
        backgroundColor: "#3498db",
        color: "#fff",
        padding: "20px",
        borderRadius: "8px",
        width: "200px",
        textAlign: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3>{title}</h3>
      <p style={{ fontSize: "1.5em", fontWeight: "bold" }}>{value}</p>
    </div>
  );
};

export default StatCard;
