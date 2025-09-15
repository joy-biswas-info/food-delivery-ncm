import Menu from "../components/client/Menu";
import Checkout from "../components/client/Checkout";
import Cart from "../components/client/Cart";

export default function Home() {
  return (
    <div>
      <Menu />
      <Cart />
      <Checkout />
    </div>
  );
}
