import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    });
    return unsub;
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 bg-white rounded shadow">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{order.name}</span>
                <span className="text-sm text-gray-500">
                  {order.createdAt?.toDate
                    ? order.createdAt.toDate().toLocaleString()
                    : new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600">Phone: {order.phone}</p>
              <div className="mt-2">
                {order.cart?.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm border-b py-1">
                    <span>
                      {item.name || item.title} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 font-bold text-right">
                Total: $
                {order.total ||
                  order.cart?.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
