import { useEffect, useState } from "react";
import "./UserFormPage.css";
import { Link } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

function UserFormPage() {
  const { user, isLogged } = useAuth();

  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    street: "",
    city: "",
    zip_code: "",
    country: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    if (!user) return;
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
          image: data.image || "",
          description: data.description || "",
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Impossible de récupérer les données utilisateur");
      });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    fetch(`http://localhost:3310/api/user/${user.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Informations mises à jour avec succès !");
        } else {
          throw new Error("Erreur lors de la mise à jour");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Impossible de mettre à jour les données");
      });
  };

  if (!isLogged) {
    return (
      <main className="link-login">
        <section>
          <p>Vous devez être connecté pour accéder à cette page.</p>
          <Link to="/login">
            <button type="button">Accéder à la page de connexion</button>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <>
      <main className="user-form-main">
        <section>
          <img src="/img/contact.png" alt="contact" />
          <figcaption>
            {formData.firstname} {formData.lastname}
          </figcaption>

          <form onSubmit={handleSubmit}>
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
            <label htmlFor="image">Image url</label>
            <input
              type="text"
              placeholder="ex: jean.dupont@example.com"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
            <label htmlFor="description">Description</label>
            <textarea
              rows={5}
              placeholder="ex: Passionné d'art contemporain..."
              name="description"
              value={formData.description}
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

            <button type="submit">Valider</button>
          </form>
        </section>
      </main>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default UserFormPage;
