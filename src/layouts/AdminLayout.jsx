import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function AdminLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/admin");
    });
    return unsub;
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white p-4 text-xl font-bold">Admin Dashboard</header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
