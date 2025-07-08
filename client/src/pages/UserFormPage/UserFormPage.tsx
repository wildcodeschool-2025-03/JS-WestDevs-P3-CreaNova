import "./UserFormPage.css";

function UserFormPage() {
  // 🎨 ÉTAPE 14: Afficher le formulaire
  return (
    <main className="user-form-main">
      <section>
        <img src="/img/contact.png" alt="contact" />
        <figcaption>Bonjour</figcaption>

        <form>
          <h2>Mes informations personnelles</h2>

          <label htmlFor="lastname">Nom</label>
          <input type="text" placeholder="ex: Dupont" name="lastname" />

          <label htmlFor="firstname">Prénom</label>
          <input name="firstname" type="text" placeholder="ex: Jean" />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="ex: jean.dupont@example.com"
            name="email"
          />

          <h2>Mon Adresse</h2>

          <label htmlFor="street">Adresse</label>
          <input type="text" placeholder="ex: 123 rue de Paris" name="street" />

          <label htmlFor="city">Ville</label>
          <input type="text" placeholder="ex: Paris" name="city" />

          <label htmlFor="zip_code">Code Postal</label>
          <input type="text" placeholder="ex: 75000" name="zip_code" />

          <label htmlFor="country">Pays</label>
          <input type="text" placeholder="ex: France" name="country" />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="ex: Passionné d'art contemporain..."
            name="description"
          />

          <button type="submit">Valider</button>
        </form>
      </section>
    </main>
  );
}

export default UserFormPage;
