import "./HomePage.css";

function HomePage() {
  return (
    <main className="main-home">
      <section className="title">
        <h1>CreaNova</h1>
        <p>L’innovation créative à portée de main</p>
      </section>
      <section className="art-preview">
        <p>
          L’art est une expression unique de créativité et d’émotion. Chaque
          œuvre raconte une histoire et invite à découvrir de nouveaux horizons.
          Plongez dans cet univers passionnant.
        </p>
        <img src="Oeuvre-homePage.webp" alt="Le vent souffle" />
      </section>
      <p className="site-intro">
        CreaNova est une galerie d’art en ligne qui réunit photos, peintures et
        dessins d’artistes passionnés. Chaque créateur peut ajouter ses œuvres,
        enrichissant ainsi la collection avec des pièces uniques. Que vous soyez
        amateur ou collectionneur, trouvez des œuvres originales à acheter pour
        personnaliser votre intérieur. CreaNova, une galerie vivante où l’art
        s’invite chez vous en toute simplicité.
      </p>
      <section className="artiste">
        <h2>Artistes</h2>
        <div className="artiste-flex">
          <p>
            Découvrez les talents qui donnent vie à notre galerie. Qu'il
            s'agisse de peinture ou de photographie, chaque artiste explore des
            univers uniques. Leurs œuvres sont des invitations à la réflexion et
            à l'émotion. Laissez-vous transporter par leurs visions singulières.
          </p>
          <a href="/">
            <figure>
              <img src="artiste-homepage.webp" alt="Bertrand Rogon" />
              <figcaption>Accéder aux artistes</figcaption>
            </figure>
          </a>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
