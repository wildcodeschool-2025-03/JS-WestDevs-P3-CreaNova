import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import "./ArtworkDetailPage.css";

function ArtworkDetailPage() {
  const { id } = useParams();

  const [artwork, setArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3310/api/artwork/${id}/artist`)
      .then((res) => res.json())
      .then((data) => {
        setArtwork(data[0]);
      })
      .catch((error) => {
        console.error("Erreur pendant fetch :", error);
      });
  }, [id]);

  if (!artwork) {
    return <p>Chargement...</p>;
  }

  return (
    <main className="artwork_detail_page">
      <h1>{artwork.title}</h1>
      <section className="artwork-info">
        <p className="description">{artwork.description}</p>
        <figure>
          <Link to={`/artwork/${artwork.id}`}>
            <img className="favorite" src="/img/favorite.png" alt="favorite" />
            <img src={artwork.image} alt={artwork.title} />

            <figcaption>
              <div className="artwork-details">
                <span>{artwork.title}</span>
              </div>
              <span className="price">{artwork.price}€</span>
              <button
                className="add-to-cart"
                type="button"
                aria-label="Ajouter au panier"
              >
                <img src="/img/shopping-cart-white-icon.png" alt="" />
              </button>
            </figcaption>
          </Link>
        </figure>
      </section>

      <h2>Artiste</h2>
      <figure className="artist">
        <Link to={`/artist/${artwork.user_account_id}`}>
          <img
            src={artwork.artist_image}
            alt={`${artwork.firstname} ${artwork.lastname}`}
          />
          <figcaption>
            {artwork.firstname} {artwork.lastname}
          </figcaption>
        </Link>
      </figure>
    </main>
  );
}

export default ArtworkDetailPage;
