import { useCart } from "../../context/CartContext";

const sampleMenu = [
  { id: "1", name: "Pizza", price: 10 },
  { id: "2", name: "Burger", price: 8 },
];

export default function Menu() {
  const { addToCart } = useCart();
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <div className="grid gap-4 grid-cols-2">
        {sampleMenu.map((item) => (
          <div key={item.id} className="p-4 border rounded shadow">
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
