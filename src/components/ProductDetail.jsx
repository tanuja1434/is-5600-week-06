// src/components/ProductDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductDetail({ data = [] }) {
  const { id } = useParams();
  const product = data.find(p => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="pa4">
        <p className="f4">Product not found.</p>
        <Link to="/" className="link underline">← Back to products</Link>
      </div>
    );
  }

  const title = product.title || product.name || `Product #${id}`;

  return (
    <div className="pa4">
      <Link to="/" className="link underline db mb3">← Back to products</Link>
      <h1 className="f3 mb2">{title}</h1>

      {product.image && (
        <img
          src={product.image}
          alt={title}
          className="db mb3"
          style={{ maxWidth: 400 }}
        />
      )}

      <p className="mb3">{product.description || 'No description available.'}</p>

      {Array.isArray(product.tags) && product.tags.length > 0 && (
        <div className="mb2">
          <strong>Tags: </strong>{product.tags.join(', ')}
        </div>
      )}
    </div>
  );
}
