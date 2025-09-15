import React from "react";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="mt-6 p-4 border rounded shadow bg-white max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-2 border rounded">
              <div>
                <p className="font-medium">{item.name || item.title}</p>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
              </div>

              <div className="flex items-center space-x-2">
                {/* Quantity Controls */}
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  −
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          {/* Total Section */}
          <div className="flex justify-between items-center border-t pt-4 font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
