// src/components/Button.jsx
import React from "react";

const Button = ({ children, className, onClick }) => (
  <button onClick={onClick} className={`p-2 rounded-md ${className}`}>
    {children}
  </button>
);

export default Button;
