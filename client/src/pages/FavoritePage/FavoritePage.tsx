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
              <img src="/img/favorite.png" alt="favorite" />
            </button>
            <img src={item.image} alt={item.title} />
            <figcaption>
              <div className="container">
                <span>{item.title}</span>
                <p>
                  de {item.firstname} {item.lastname}
                </p>
              </div>
              <span className="price">{item.price}€</span>
              <button
                className="add-to-cart"
                type="button"
                aria-label="Ajouter au panier"
              >
                <img src="/img/shopping-cart-white-icon.png" alt="shop" />
              </button>
            </figcaption>
          </figure>
        ))}
      </main>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}
export default FavoritePage;
