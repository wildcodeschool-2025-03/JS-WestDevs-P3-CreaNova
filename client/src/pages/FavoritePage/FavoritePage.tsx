import { useEffect, useState } from "react";
import "./FavoritePage.css";
import { useParams } from "react-router";

function FavoritePage() {
  const [favorite, setFavorite] = useState<Favorite[]>([]);
  const { userId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3310/api/user/${userId}/favorite`)
      .then((res) => res.json())
      .then((data) => setFavorite(data));
  }, [userId]);

  return (
    <main className="favorite-page">
      <h1 className="title">Favoris</h1>

      {favorite.map((item) => (
        <figure key={item.id}>
          <img className="favorite" src="/img/favorite.png" alt="favorite" />
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
  );
}
export default FavoritePage;
