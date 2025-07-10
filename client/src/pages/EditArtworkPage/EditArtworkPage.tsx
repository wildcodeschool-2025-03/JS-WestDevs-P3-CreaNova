import { useParams } from "react-router";
import "./EditArtworkPage.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function EditArtworkPage() {
  const [artwork, setArtwork] = useState<Artwork>();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  const { userId, artworkId } = useParams();

  const dataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    // console.log("userid: ", userId);
    // console.log("artworkid : ", artworkId);
    fetch(`http://localhost:3310/api/artist/${userId}/artworks/${artworkId}`)
      .then((res) => res.json())
      .then((data) => {
        setArtwork(data[0]);
        setForm({
          title: data[0]?.title,
          description: data[0]?.description,
          price: data[0]?.price,
          image: data[0]?.image,
        });
      });
    // console.log("artwork: ", artwork);
  }, [userId, artworkId]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:3310/api/artwork/${artworkId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        fetch(`http://localhost:3310/api/artwork/${artworkId}`)
          .then((res) => res.json())
          .then((data) => {
            setArtwork(data[0]);
            setForm({
              title: data[0]?.title,
              description: data[0]?.description,
              price: data[0]?.price,
              image: data[0]?.image,
            });
            toast.success("Oeuvre modifiée !");
          });
      });
  };

  if (!artwork) {
    return <h1>Problemo</h1>;
  }
  return (
    <main className="edit-artwork-page">
      <section>
        <h1>Modifier l'oeuvre</h1>
        <form className="form" onSubmit={handleOnSubmit}>
          <label htmlFor="title"> Titre de l'oeuvre </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={dataChange}
          />

          <label htmlFor="description"> Description de l'oeuvre</label>
          <input
            id="description"
            type="text"
            name="description"
            value={form.description}
            onChange={dataChange}
          />

          <label htmlFor="price"> Tarif:</label>
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={dataChange}
          />

          <label htmlFor="image"> Image URL:</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={dataChange}
          />

          <button type="submit">Modifier</button>
        </form>
      </section>
    </main>
  );
}

export default EditArtworkPage;
