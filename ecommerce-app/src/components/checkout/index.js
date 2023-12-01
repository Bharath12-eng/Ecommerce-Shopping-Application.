import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // Load the cart from local storage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    // Calculate total cost when cart changes
    const calculateTotalCost = () => {
      const cost = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      setTotalCost(cost);
    };

    calculateTotalCost();
  }, [cart]);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handlePlaceOrder = () => {
    // Here you can implement the logic to place the order
    // It could involve sending the order details to a server or any other appropriate action
    // For this example, we'll simply clear the cart
    setCart([]);
    setTotalCost(0);
    localStorage.removeItem('cart');
    toast.success("Order Placed Successfully", { position: toast.POSITION.TOP_CENTER, theme: "colored", autoClose: 3000 })
  };

  return (
    <div className="checkout-container">
      <h2>Your Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${item.price * item.quantity}</td>
              <td>
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="total-cost">Total Cost: ${totalCost}</p>
      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
