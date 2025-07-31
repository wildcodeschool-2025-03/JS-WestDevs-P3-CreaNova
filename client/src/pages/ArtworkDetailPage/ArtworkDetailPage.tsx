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
    <main className="artwork-detail-page">
      <h1>{artwork.title}</h1>
      <section className="artwork-info">
        <p>{artwork.description}</p>
        <figure>
          <Link to={`/artwork/${artwork.id}`}>
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
            </label>{" "}
            <img
              src={`http://localhost:3310/${artwork.image}`}
              alt={artwork.title}
            />
            <figcaption>
              <div className="artwork-details">
                <span>{artwork.title}</span>
                <span className="tags">{artwork.tags}</span>
              </div>
              <span className="price">{artwork.price}€</span>
              {artwork.sold ? (
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
          </Link>
        </figure>
      </section>

      <h2>Artiste</h2>
      <figure className="artist">
        <Link to={`/artist/${artwork.user_account_id}`}>
          <img
            src={`http://localhost:3310/${artwork.artist_image}`}
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
