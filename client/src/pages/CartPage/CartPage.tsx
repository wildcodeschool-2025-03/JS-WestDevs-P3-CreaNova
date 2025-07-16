import { useCart } from "../../hooks/useCart";
import "./CartPage.css";
function CartPage() {
  const { cart, removeFromCart } = useCart();
  const numberItem = cart.length;

  return (
    <main className="cart-page-main">
      <h1>Votre panier({numberItem})</h1>
      <section>
        {cart.map((artwork) => (
          <figure key={artwork.id}>
            <img className="favorite" src="/img/favorite.png" alt="favorite" />
            <img src={artwork.image} alt={artwork.title} />

            <figcaption>
              <div className="artwork-details">
                <span>{artwork.title}</span>
                {/* <p className="artist-name">
                  de {artwork.firstname} {artwork.lastname}
                </p> */}
              </div>
              <span className="price">{artwork.price}€</span>
              <button
                type="button"
                className="add-to-cart"
                onClick={() => removeFromCart(artwork.id)}
                aria-label="Suppression article"
              >
                <img src="/img/delete_white.png" alt="delete button" />
              </button>
            </figcaption>
          </figure>
        ))}
      </section>
    </main>
  );
}

export default CartPage;
