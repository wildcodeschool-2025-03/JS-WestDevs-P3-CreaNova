import { useEffect, useState } from "react";

function NewsSection() {
  const [news, setNews] = useState<New[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<New | null>(null);

  useEffect(() => {
    fetch("http://localhost:3310/api/admin/news", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
      });
  }, []);

  const openModal = (n: New) => {
    setSelectedNews(n);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData);
    fetch(`http://localhost:3310/api/admin/new/${selectedNews?.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });
    setModalOpen(false);
  };

  if (!news) {
    return <h1>Aucune actualité</h1>;
  }
  return (
    <section className="news-section-admin-dashboard">
      <h2>Actualités</h2>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Image</th>
            <th>Editer</th>
          </tr>
        </thead>
        <tbody>
          {news.map((n) => (
            <tr key={n.id}>
              <td>{n.title}</td>
              <td>{n.text}</td>
              <td>
                {n.image && (
                  <img src={`http://localhost:3310/${n.image}`} alt={n.title} />
                )}
              </td>
              <td>
                <button type="button" onClick={() => openModal(n)}>
                  Editer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && selectedNews && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Titre:</label>
            <input name="title" defaultValue={selectedNews.title} />
            <label htmlFor="image">Image:</label>
            <input name="image" defaultValue={selectedNews.image} />
            <label htmlFor="text">Description:</label>
            <textarea name="text" defaultValue={selectedNews.text} />
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={() => setModalOpen(false)}>
              Annuler
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default NewsSection;
