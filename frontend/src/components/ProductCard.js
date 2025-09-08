// import React, { useState } from 'react';

// const ProductCard = ({ product, addToCart }) => {
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = () => {
//     // Add the product with selected quantity to the cart
//     addToCart(product, quantity);
//   };

//   return (
//     <div className="product-card border rounded-lg shadow-md p-4 bg-white">
//       {/* Product Image */}
//       <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
      
//       {/* Product Details */}
//       <div className="product-details p-4">
//         <h3 className="font-bold text-xl text-gray-800">{product.name}</h3>
//         <p className="text-sm text-gray-600">{product.description}</p>
//         <p className="text-lg text-green-500 font-semibold">${product.price}</p>
//       </div>

//       {/* Quantity and Add to Cart Button */}
//       <div className="product-actions flex justify-between items-center p-4">
//         <div className="quantity-selector flex items-center">
//           <button
//             className="border rounded-full p-1"
//             onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
//           >
//             -
//           </button>
//           <span className="mx-2 text-lg">{quantity}</span>
//           <button
//             className="border rounded-full p-1"
//             onClick={() => setQuantity(quantity + 1)}
//           >
//             +
//           </button>
//         </div>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//           onClick={handleAddToCart}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;

import React, { useState } from "react";
import PropTypes from "prop-types";

const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  // Provide default values if product is undefined
  const { image, name, description, price } = product || {};

  const handleAddToCart = () => {
    if (!product) {
      console.error("Product data is missing!");
      return;
    }
    addToCart(product, quantity);
  };

  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-image-container">
        <img
          src={image || "/default-product.jpg"} // Default image if none provided
          alt={name || "Product"}
          className="product-image"
        />
      </div>

      {/* Product Details */}
      <div className="product-details">
        <h3 className="product-title">{name || "Unknown Product"}</h3>
        <p className="product-description">{description || "No description available."}</p>
        <p className="product-price">{price ? `$${price.toFixed(2)}` : "Price Unavailable"}</p>
      </div>

      {/* Quantity Selector & Add to Cart */}
      <div className="product-actions">
        <div className="quantity-selector">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
      <style>
        {`
        /* Product Card Container */
.product-card {
  width: 100%;
  max-width: 320px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  text-align: center;
  padding: 15px;
}

.product-card:hover {
  transform: scale(1.05);
}

/* Product Image */
.product-image-container {
  width: 100%;
  height: 200px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Details */
.product-details {
  padding: 10px 0;
}

.product-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.product-description {
  font-size: 14px;
  color: #666;
  margin: 5px 0;
}

.product-price {
  font-size: 16px;
  font-weight: bold;
  color: #28a745;
}

/* Quantity Selector */
.quantity-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  margin-bottom: 10px;
}

.quantity-selector button {
  background: #ddd;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.quantity-selector button:hover {
  background: #ccc;
}

/* Add to Cart Button */
.add-to-cart-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease-in-out;
  font-size: 16px;
}

.add-to-cart-btn:hover {
  background: #0056b3;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-card {
    max-width: 100%;
  }
}
`}
      </style>
    </div>
  );
};

// PropTypes for validation
ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }),
  addToCart: PropTypes.func.isRequired,
};

export default ProductCard;

