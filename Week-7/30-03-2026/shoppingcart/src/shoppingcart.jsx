import React, { useState } from 'react';

// Sample Product Data
const PRODUCTS = [
  { id: 1, name: 'React T-Shirt', price: 25 },
  { id: 2, name: 'Angular Hoodie', price: 50 },
  { id: 3, name: 'JavaScript Sticker', price: 5 },
];

export default function ShoppingCartApp() {
  const [cartItems, setCartItems] = useState([]);

  // --- Logic / Handlers ---

  const addToCart = (product) => {
    setCartItems((prev) => {
      // Check if item already exists
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      // Otherwise, add new item with qty 1
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0) // Automatically remove if qty hits 0
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // --- Derived State ---
  // No need for a separate 'total' state; we calculate it on every render
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Store</h1>
      <div style={{ marginBottom: '40px' }}>
        {PRODUCTS.map((product) => (
          <div key={product.id} style={{ marginBottom: '10px' }}>
            {product.name} - ${product.price} {' '}
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <hr />

      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <strong>{item.name}</strong>
              <span>${item.price} x {item.qty} = ${item.price * item.qty}</span>
              <button onClick={() => updateQty(item.id, 1)}>+</button>
              <button onClick={() => updateQty(item.id, -1)}>-</button>
              <button onClick={() => removeItem(item.id)} style={{ color: 'red' }}>
                Remove
              </button>
            </div>
          ))}
          <h3 style={{ borderTop: '1px solid #ccc', paddingTop: '10px' }}>
            Total: ${totalPrice}
          </h3>
        </>
      )}
    </div>
  );
}