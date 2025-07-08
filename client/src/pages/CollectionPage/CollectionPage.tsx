import "./CollectionPage.css";

function CollectionPage() {
  return (
    <main className="collection_page">
      <section>
        <h1>Bonjour........</h1>
        <form className="form">
          <label htmlFor="titre"> Titre de l'oeuvre </label>
          <input type="text" />

          <label htmlFor=""> Description de l'oeuvre</label>
          <input id="description" type="text" />

          <label htmlFor="titre"> Tags:(pour référencer l'oeuvre) </label>
          <input type="text" />

          <label htmlFor=""> Tarifs:</label>
          <input type="text" />

          <label htmlFor="titre">
            {" "}
            Ajouter des collections ou des oeuvres:{" "}
          </label>
          <input type="text" />

          <label htmlFor=""> Supprimer des collections ou des oeuvres:</label>
          <input type="text" />
        </form>
        <section className="button">
          <button type="submit">Modifier</button>

          <button type="submit">Valider</button>
        </section>

        <section className="delete">
          <img src="img/IMG_0864.JPG" alt="artwork" />
          <img id="trash" src="img/delete_black.png" alt="delete" />
          <h1>Titre de l'oeuvre </h1>
        </section>
      </section>
    </main>
  );
}

export default CollectionPage;
