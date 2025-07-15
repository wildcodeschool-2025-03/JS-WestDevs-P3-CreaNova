import { useEffect, useState } from "react";
import "./Favoritespage.css";

function Favoritespage() {
  const [favorite, setFavorite] = useState<Favorite[]>([]);
  const userId = 2;

  useEffect(() => {
    fetch(`http://localhost:3310/api/user/${userId}/favorite`)
      .then((res) => res.json())
      .then((data) => setFavorite(data));
  }, []);

  return (
    <main className="favorites_page">
      <h1 className="title">Favoris</h1>

      {favorite.map((item) => (
        <figure key={item.id}>
          <img src={item.image} alt={item.title} />
          <figcaption>{item.title}</figcaption>
        </figure>
        // <div key={item.id}>
        //   <p>{item.title}</p>
        // </div>
      ))}
    </main>
  );
}
export default Favoritespage;
