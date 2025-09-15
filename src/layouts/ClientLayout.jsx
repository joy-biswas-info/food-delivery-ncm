import { Outlet } from "react-router-dom";
import Header from "../components/client/Header";

export default function ClientLayout() {
  return (
    <div>
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
