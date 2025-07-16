import { useCart } from "../../hooks/useCart";
import "./CartPage.css";
function CartPage() {
  const { cart } = useCart();
  return (
    <main>
      <h1>coucou</h1>
      {cart.map((test) => (
        <div key={test.id}>
          <p>{test.title}</p>
          <img src={test.image} alt={test.title} />
        </div>
      ))}
    </main>
  );
}

export default CartPage;
