import "./ArtworkModificationPage.css";

function ArtworkModificationPage() {
  return (
    <main className="artwork_modification_page">
      <section>
        <h1>Modifier l'oeuvre</h1>
        <form className="form">
          <label htmlFor="titre"> Titre de l'oeuvre </label>
          <input type="text" />

          <label htmlFor=""> Description de l'oeuvre</label>
          <input id="description" type="text" />

          <label htmlFor=""> Catégorie de l'oeuvre</label>

          <select id="categorie" name="categorie">
            <option value="...">...</option>
            <option value="photographie">Photographie</option>
            <option value="dessin">Dessin</option>
            <option value="peinture">Peinture</option>
          </select>

          <label htmlFor="titre"> Tags:(pour référencer l'oeuvre) </label>
          <input type="text" />

          <label htmlFor=""> Tarifs:</label>
          <input type="text" />
          <button type="submit">Modifier</button>
        </form>
      </section>
    </main>
  );
}

export default ArtworkModificationPage;
