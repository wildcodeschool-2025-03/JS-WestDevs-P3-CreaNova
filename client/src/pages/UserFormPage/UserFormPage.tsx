import { useContext, useEffect, useState } from "react";
import "./UserFormPage.css";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

function UserFormPage() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Erreur: Contexte d'authentification non trouvé</div>;
  }

  const { user } = authContext;

  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    street: "",
    city: "",
    zip_code: "",
    country: "",
    description: "",
  });

  useEffect(() => {
    if (!user || !user.id) return;

    fetch(`http://localhost:3310/api/user/${user.id}`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération");
        }
        return response.json();
      })
      .then((data) => {
        setFormData({
          lastname: data.lastname || "",
          firstname: data.firstname || "",
          email: data.email || "",
          street: data.street || "",
          city: data.city || "",
          zip_code: data.zip_code || "",
          country: data.country || "",
          description: data.description || "",
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Impossible de récupérer les données utilisateur");
      });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <main className="user-form-main">
      <section>
        <img src="/img/contact.png" alt="contact" />
        <figcaption>{`${formData.firstname} ${formData.lastname}`}</figcaption>

        <form>
          <h2>Mes informations personnelles</h2>

          <label htmlFor="lastname">Nom</label>
          <input
            type="text"
            placeholder="ex: Dupont"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />

          <label htmlFor="firstname">Prénom</label>
          <input
            name="firstname"
            type="text"
            placeholder="ex: Jean"
            value={formData.firstname}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="ex: jean.dupont@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <h2>Mon Adresse</h2>

          <label htmlFor="street">Adresse</label>
          <input
            type="text"
            placeholder="ex: 123 rue de Paris"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />

          <label htmlFor="city">Ville</label>
          <input
            type="text"
            placeholder="ex: Paris"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />

          <label htmlFor="zip_code">Code Postal</label>
          <input
            type="text"
            placeholder="ex: 75000"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
          />

          <label htmlFor="country">Pays</label>
          <input
            type="text"
            placeholder="ex: France"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="ex: Passionné d'art contemporain..."
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <button type="submit">Valider</button>
        </form>
      </section>
    </main>
  );
}

export default UserFormPage;
