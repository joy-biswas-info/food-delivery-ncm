import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Header() {
  const { cart } = useCart();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <header className="bg-green-600 text-white px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Foodie
      </Link>
      <nav className="flex gap-4 items-center">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/admin" className="hover:underline">
          Admin
        </Link>
        <div className="bg-white text-green-600 px-2 py-1 rounded">
          Cart: {cart.reduce((sum, item) => sum + item.quantity, 0)}
        </div>
        {user ? (
          <button onClick={() => signOut(auth)} className="bg-red-500 text-white px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <span className="text-sm">Guest</span>
        )}
      </nav>
    </header>
  );
}
