import { useParams } from "react-router";
import "./EditArtworkPage.css";
import { useEffect, useState } from "react";

function EditArtworkPage() {
  const [artwork, setArtwork] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3310/api/artwork/${id}`)
      .then((res) => res.json())
      .then((data) => setArtwork(data));
  }, [id]);

  // const handleOnSubmit = () => {
  //   fetch(`http://localhost:3310/api/artwork/${id}`, {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(),
  //   });
  // };

  if (!artwork) {
    return <h1>Problemo</h1>;
  }
  return (
    <main className="edit-artwork-page">
      <section>
        <h1>Modifier l'oeuvre</h1>
        <form className="form">
          <label htmlFor="title"> Titre de l'oeuvre </label>
          <input type="text" name="title" />

          <label htmlFor="description"> Description de l'oeuvre</label>
          <input id="description" type="text" name="description" />

          <label htmlFor="price"> Tarif:</label>
          <input type="text" name="price" />

          <label htmlFor="image"> Image URL:</label>
          <input type="text" name="image" />

          <label htmlFor=""> Catégorie de l'oeuvre</label>

          <select id="categorie" name="categorie">
            <option value="...">...</option>
            <option value="photographie">Photographie</option>
            <option value="dessin">Dessin</option>
            <option value="peinture">Peinture</option>
          </select>

          <label htmlFor=""> Tags:(pour référencer l'oeuvre) </label>
          <input type="text" />

          <button type="submit">Modifier</button>
        </form>
      </section>
    </main>
  );
}

export default EditArtworkPage;
