import { useEffect, useState } from "react";
interface Artwork {
  id: number;
  title: string;
  image: string;
  price: number;
  sold: boolean;
}
function ArtworksSection() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/admin/artworks", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setArtworks(data);
      });
  }, []);

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette oeuvre ?",
    );
    if (!confirmDelete) return;
    fetch(`http://localhost:3310/api/admin/artwork/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        setArtworks((prev) => prev.filter((u) => u.id !== id));
      }
    });
  };
  if (!artworks) {
    return <h1>problem</h1>;
  }
  return (
    <section className="admin-dashboard-artwork-section">
      <h2>Oeuvre</h2>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Image</th>
            <th>Prix</th>
            <th>Vendu</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {artworks.map((artwork) => (
            <tr key={artwork.id}>
              <td>{artwork.title}</td>
              <td>
                <img
                  src={`http://localhost:3310/${artwork.image}`}
                  alt={artwork.title}
                />
              </td>
              <td>{artwork.price}</td>
              {artwork.sold ? <td>Vendu</td> : <td>Disponible</td>}
              <td>
                <button type="button" onClick={() => handleDelete(artwork.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
export default ArtworksSection;
