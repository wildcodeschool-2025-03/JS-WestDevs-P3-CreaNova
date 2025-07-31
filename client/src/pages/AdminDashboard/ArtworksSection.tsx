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
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const artworksPerPage = 10;

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

  const filteredArtworks = artworks.filter((artwork) =>
    artwork.title.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredArtworks.length / artworksPerPage);
  const startIdx = (currentPage - 1) * artworksPerPage;
  const paginatedArtworks = filteredArtworks.slice(
    startIdx,
    startIdx + artworksPerPage,
  );

  const handlePrev = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };
  const handleNext = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  return (
    <section className="admin-dashboard-artwork-section">
      <h2>Oeuvre</h2>
      <input
        type="text"
        placeholder="Rechercher par titre..."
        className="input-search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />
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
          {paginatedArtworks.map((artwork) => (
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
      <div>
        <button
          type="button"
          className="not-delete-cancel-button"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          onClick={handleNext}
          className="not-delete-cancel-button"
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
    </section>
  );
}
export default ArtworksSection;
