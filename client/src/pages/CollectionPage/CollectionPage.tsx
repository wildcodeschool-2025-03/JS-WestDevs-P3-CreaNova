import { useEffect, useState } from "react";
import "./CollectionPage.css";
import { Link, useParams } from "react-router";

function CollectionPage() {
  const [artwork, setArtwork] = useState<Artwork[]>([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3310/api/artwork/${id}`)
      .then((res) => res.json())
      .then((data) => setArtwork(data));
  }, [id]);

  if (!artwork) {
    return <h1>Vous n'avez aucune oeuvre</h1>;
  }
  return (
    <main className="collection-page-main">
      <h1>Ma collection</h1>
      {artwork.map((item) => (
        <figure key={item.id}>
          <Link to={`http://localhost:3000/artist/${id}/artwork/${item.id}`}>
            <img src={item.image} alt={item.title} />
            <figcaption>{item.title}</figcaption>
          </Link>
        </figure>
      ))}
    </main>
  );
}

export default CollectionPage;
