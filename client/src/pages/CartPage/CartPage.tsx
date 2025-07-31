import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import "./CartPage.css";
import { Link } from "react-router";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

function CartPage() {
  const { cart, removeFromCart, total, clearCart } = useCart();
  const { isLogged } = useAuth();
  const numberItem = cart.length;
  const [showModal, setShowModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData);

    const cardNumber = String(values.cardNumber);
    const expiry = String(values.expiry);
    const cvc = String(values.cvc);
    const name = String(values.name);

    if (
      cardNumber.length < 16 ||
      !/^[0-9]{16}$/.test(cardNumber.replace(/\s/g, "")) ||
      !/^[0-9]{2}\/([0-9]{2}|[0-9]{4})$/.test(expiry) ||
      !/^[0-9]{3,4}$/.test(cvc) ||
      name.length < 2
    ) {
      setError("Merci de remplir correctement tous les champs.");
      return;
    }

    const artwork_ids = cart.map((a) => a.id);
    const means_of_payment = "Crédit Card";
    fetch("http://localhost:3310/api/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ artwork_ids, means_of_payment }),
    }).then((res) => {
      if (res.ok) {
        setError("");
        setPaymentSuccess(true);
        clearCart();
        setTimeout(() => {
          setShowModal(false);
          setPaymentSuccess(false);
        }, 2000);
      } else {
        setError("Erreur lors du paiement.");
      }
    });
  };

  if (!isLogged) {
    return (
      <main className="link-login">
        <section>
          <p>Vous devez être connecté pour accéder à cette page.</p>
          <Link to="/login">
            <button type="button">Accéder à la page de connexion</button>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <>
      <main className="cart-page-main">
        <h1>Votre panier({numberItem})</h1>
        {cart.length === 0 && <h2>Votre panier est vide...</h2>}
        <section>
          {cart.map((artwork) => (
            <figure key={artwork.id}>
              <label className="container favorite">
                <input type="checkbox" onClick={(e) => e.stopPropagation()} />
                <svg
                  id="Layer_1"
                  version="1.0"
                  viewBox="0 0 24 24"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <title>Favori</title>
                  <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z" />
                </svg>
              </label>
              <img
                src={`http://localhost:3310/${artwork.image}`}
                alt={artwork.title}
              />
              <figcaption>
                <div className="artwork-details">
                  <span>{artwork.title}</span>
                  <p className="artist-name">de {artwork.artist_name}</p>
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
        <aside>
          <div>
            <span>Frais de livraison</span>
            <span>Offert</span>
          </div>
          <div>
            <span>Total</span>
            <span>{total}€</span>
          </div>
          <button type="button" onClick={() => setShowModal(true)}>
            Valider et payer
          </button>
        </aside>

        {showModal && (
          <div className="modal-overlay">
            <dialog>
              <button
                type="button"
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              {paymentSuccess ? (
                <div className="payment-success">
                  Paiement effectué avec succès !
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2>Paiement sécurisé</h2>
                  <label>
                    Numéro de carte
                    <input
                      type="text"
                      name="cardNumber"
                      maxLength={16}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </label>
                  <div>
                    <label>
                      Expiration
                      <input
                        type="text"
                        name="expiry"
                        maxLength={5}
                        placeholder="MM/AA"
                        required
                      />
                    </label>
                    <label>
                      CVC
                      <input
                        type="text"
                        name="cvc"
                        maxLength={4}
                        placeholder="123"
                        id="cvc"
                        required
                      />
                    </label>
                  </div>
                  <label>
                    Nom sur la carte
                    <input
                      type="text"
                      name="name"
                      placeholder="Nom complet"
                      required
                    />
                  </label>
                  {error && <p>{error}</p>}
                  <button type="submit">Payer {total}€</button>
                </form>
              )}
            </dialog>
          </div>
        )}
      </main>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default CartPage;
