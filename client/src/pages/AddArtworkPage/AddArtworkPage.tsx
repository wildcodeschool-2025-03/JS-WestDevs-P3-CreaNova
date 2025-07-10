import "./AddArtworkPage.css";

function AddArtworkPage() {
  return (
    <main className="add-artwork-page">
      <section>
        <h1>Ajouter une oeuvre</h1>
        <form className="form">
          <label htmlFor="title"> Titre de l'oeuvre </label>
          <input type="text" />

          <label htmlFor=""> Description de l'oeuvre</label>
          <input id="description" type="text" />

          <label htmlFor=""> Image URL </label>
          <input type="text" />

          <label htmlFor=""> Catégorie de l'oeuvre</label>

          <select id="categorie" name="categorie">
            <option value="...">...</option>
            <option value="photographie">Photographie</option>
            <option value="dessin">Dessin</option>
            <option value="peinture">Peinture</option>
          </select>

          <label htmlFor=""> Tags:(pour référencer l'oeuvre) </label>
          <input type="text" />

          <label htmlFor=""> Tarif:</label>
          <input type="text" />
          <button type="submit">Ajouter</button>
        </form>
      </section>
    </main>
  );
}

export default AddArtworkPage;
