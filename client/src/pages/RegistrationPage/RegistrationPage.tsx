import "./RegistrationPage.css";

function RegistrationPage() {
  const handleSubmit = (data: FormData) => {
    const values = Object.fromEntries(data);
    if (values.password !== values.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    const formData = JSON.stringify({
      ...values,
      zip_code: Number(values.zip_code),
      is_artist: values.is_artist === "on",
    });
    console.log(formData);
    fetch("http://localhost:3310/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    });
  };

  return (
    <main className="registration-main">
      <img src="/image16.webp" alt="Artwork" />
      <section>
        <img src="/black_logo.png" alt="logo of CreaNova" />
        <h1>Créer mon compte</h1>
        <form action={handleSubmit}>
          <label htmlFor="firstname">prénom</label>
          <input name="firstname" type="text" placeholder="Prénom" />
          <label htmlFor="lastname">Nom</label>
          <input type="text" placeholder="nom" name="lastname" />
          <label htmlFor="email">email</label>
          <input type="email" placeholder="Email" name="email" />
          <label htmlFor="password">mot de passe</label>
          <input type="password" name="password" placeholder="mot de passe" />
          <label htmlFor="confirmPassword">passwordconfirm</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="confirmez mdp"
          />
          <label htmlFor="street">street</label>
          <input type="text" name="street" placeholder="street" />
          <label htmlFor="city">city</label>
          <input type="text" name="city" placeholder="city" />
          <label htmlFor="zip_code">zip code</label>
          <input type="text" name="zip_code" placeholder="zipcode" />
          <label htmlFor="country">country</label>
          <input type="text" name="country" placeholder="country" />
          <div>
            <label htmlFor="is_artist">
              Veuillez cocher si vous êtes un artiste
            </label>
            <input type="checkbox" id="is_artist" name="is_artist" />
          </div>
          <button type="submit">Créer un compte</button>
          {/* <div className="registration-policy">
            <input
              type="checkbox"
              id="policy"
              className="registration-policy-checkbox"
            />
            <label htmlFor="policy" className="registration-policy">
              accepter la politique de confidentialité
            </label>
          </div> */}
        </form>
      </section>
    </main>
  );
}
export default RegistrationPage;
