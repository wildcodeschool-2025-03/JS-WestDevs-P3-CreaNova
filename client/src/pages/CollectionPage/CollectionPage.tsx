import "./CollectionPage.css";

function CollectionPage() {
  return (
    <main className="collection_page">
      <section>
        <h1>Bonjour........</h1>
        <form className="formular">
          <label for="titre"> Titre de l'oeuvre </label>
          <input type="text" />
          <br />
          <label for=""> Description de l'oeuvre</label>
          <input id="description" type="text" />
          <br />
          <label for="titre"> Tags:(pour référencer l'oeuvre) </label>
          <input type="text" />
          <br />
          <label for=""> Tarifs:</label>
          <input type="text" />
          <br />
          <label for="titre"> Ajouter des collections ou des oeuvres: </label>
          <input type="text" />
          <br />
          <label for=""> Supprimer des collections ou des oeuvres:</label>
          <input type="text" />
          <br />
        </form>
        <section className="button">
          <br />
          <button type="submit">Modifier</button>
          <br />
          <button type="submit">Valider</button>
        </section>
        <br />
        <br />
        <section className="delete">
          <img src="img/IMG_0864.JPG" alt="artwork" />
          <img id="trash" src="img/delete_black.png" alt="delete" />
          <h1>
            Titre de l'oeuvre <br />
          </h1>
        </section>
      </section>
    </main>
  );
}

export default CollectionPage;
