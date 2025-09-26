// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import CardList from "./components/CardList";
import ProductDetail from "./components/ProductDetail";

// ✅ Important: add .json extension if it's a JSON file
import productData from "./data/full-products.json";

export default function App() {
  return (
    <Routes>
      {/* Home route: shows the list with filtering + pagination */}
      <Route path="/" element={<CardList data={productData} pageSize={6} />} />
      
      {/* Detail route: shows a single product by ID */}
      <Route path="/product/:id" element={<ProductDetail data={productData} />} />
    </Routes>
  );
}
