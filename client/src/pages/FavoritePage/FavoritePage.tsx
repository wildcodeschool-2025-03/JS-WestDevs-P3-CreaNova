import { useEffect, useState } from "react";
import "./FavoritePage.css";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

function FavoritePage() {
  const [favorite, setFavorite] = useState<Favorite[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    if (!user?.id) return;
    fetch(`http://localhost:3310/api/user/${user?.id}/favorite`)
      .then((res) => res.json())
      .then((data) => setFavorite(data));
  }, [user?.id]);

  const handleRemoveFavorite = (artworkId: number) => {
    if (!user?.id) return;
    fetch(`http://localhost:3310/api/user/${user?.id}/favorite/${artworkId}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        setFavorite((prev) => prev.filter((item) => item.id !== artworkId));
        toast.success("Article retiré des favoris");
      }
    });
  };
  if (favorite.length === 0) {
    return (
      <main className="place-items">
        <h1>Vous n'avez pas d'article dans vos favoris</h1>
      </main>
    );
  }
  return (
    <>
      <main className="favorite-page">
        <h1 className="title">Favoris</h1>

        {favorite.map((item) => (
          <figure key={item.id}>
            <button
              type="button"
              className="remove-favorite"
              onClick={() => handleRemoveFavorite(item.id)}
            >
              <label className="container">
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
            </button>
            <img src={`http://localhost:3310/${item.image}`} alt={item.title} />
            <figcaption>
              <div className="container">
                <span>{item.title}</span>
                <p>
                  de {item.firstname} {item.lastname}
                </p>
              </div>
              <span className="price">{item.price}€</span>
              {item.sold ? (
                <span className="is-sold">Vendu</span>
              ) : (
                <button
                  className="add-to-cart"
                  type="button"
                  aria-label="Ajouter au panier"
                >
                  <img src="/img/shopping-cart-white-icon.png" alt="" />
                </button>
              )}
            </figcaption>
          </figure>
        ))}
      </main>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}
export default FavoritePage;
