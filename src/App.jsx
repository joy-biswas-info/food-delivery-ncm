import { CartProvider } from "./context/CartContext";
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/admin/AdminDashboard";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ClientLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/admin" element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
