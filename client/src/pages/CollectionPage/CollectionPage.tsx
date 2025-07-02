import "./CollectionPage.css";

function CollectionPage() {
  return (
    <main className="collection_page">
      <section>
        <h1>Bonjour........</h1>
        <form className="formular">
          <label for="titre">Titre de l'oeuvre </label>
          <input type="text" placeholder="ex: Le soleil dans les champs" />
          <br />
          <label for="">Description de l'oeuvre</label>
          <input type="text" placeholder="ex: " />
          <br />
          <label for="titre">Tags:(pour référencer l'oeuvre) </label>
          <input type="text" placeholder="ex: paysage, peinture" />
          <br />
          <label for="">Tarifs:</label>
          <input type="text" placeholder="ex: 566€" />
          <br />
          <label for="titre">Ajouter des collections ou des oeuvres: </label>
          <input type="text" placeholder="ex: " />
          <br />
          <label for="">Supprimer des collections ou des oeuvres:</label>
          <input type="text" placeholder="ex: " />
          <br />
        </form>
        <button type="submit">Modifier</button>
        <br />
        <button type="submit">Valider</button>
      </section>
    </main>
  );
}

export default CollectionPage;
