import { useCart } from "../../context/CartContext";

const sampleMenu = [
  { id: "1", name: "Pizza", price: 10 },
  { id: "2", name: "Burger", price: 8 },
  { id: "3", name: "Pasta", price: 12 },
  { id: "4", name: "Salad", price: 7 },
];

export default function Menu() {
  const { addToCart } = useCart();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sampleMenu.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded shadow hover:shadow-lg transition bg-white flex flex-col items-center"
          >
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-700 mb-4">${item.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(item)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full sm:w-auto"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
