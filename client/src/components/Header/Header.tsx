import { slide as Menu } from "react-burger-menu";
import "./Header.css";
import { useState } from "react";
import { Link } from "react-router";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };
  return (
    <header>
      <Menu isOpen={isOpen} onOpen={handleOpenMenu} onClose={handleCloseMenu}>
        <Link
          id="artist"
          className="menu-item"
          to="/artist"
          onClick={handleCloseMenu}
        >
          Artistes
        </Link>

        <Link
          id="peintures"
          className="menu-item"
          to="/galleryPage"
          onClick={handleCloseMenu}
        >
          Peintures
        </Link>

        <Link
          id="photographies"
          className="menu-item"
          to="/galleryPage"
          onClick={handleCloseMenu}
        >
          Photographies
        </Link>

        <Link
          id="dessins"
          className="menu-item"
          to="/galleryPage"
          onClick={handleCloseMenu}
        >
          Dessins
        </Link>

        <Link
          id="newsletter"
          className="menu-item"
          to="/newsletter"
          onClick={handleCloseMenu}
        >
          Newsletters
        </Link>

        <Link
          id="a propos"
          className="menu-item"
          to="/a propos"
          onClick={handleCloseMenu}
        >
          A propos
        </Link>
      </Menu>
      <section className="left_nav">
        <Link to="/">
          <img className="logo" src="/img/black_logo.png" alt="logo-black" />
        </Link>
        <nav className="nav_categories">
          <button type="button">
            <Link to="/artist">
              <span>Artistes</span>
            </Link>
          </button>

          <button type="button">
            <Link to="/galleryPage">
              <span>Peintures</span>
            </Link>
          </button>
          <button type="button">
            <Link to="/galleryPage">
              <span>Photographies</span>
            </Link>
          </button>

          <button type="button">
            <Link to="/galleryPage">
              <span>Dessins</span>
            </Link>
          </button>

          <button type="button">
            <Link to="/newsletter">
              <span>Newsletter</span>
            </Link>
          </button>
          <button type="button">
            <Link to="/a propos">
              <span>A propos</span>
            </Link>
          </button>
        </nav>

        <nav className="nav_menu">
          <Link to="/dark_mode">
            <img src="/img/soleil.png" alt="dark_mode" />
          </Link>
          <Link to="/favoris">
            <img src="/img/amour-du-coeur.png" alt="coeur" />
          </Link>
          <Link to="/panier">
            <img src="/img/panier.png" alt="panier" />
          </Link>

          <button type="button" popoverTarget="contact_modal">
            <img src="/img/contact.png" alt="contact" />
          </button>
          <dialog popover="auto" id="contact_modal">
            <Link to="/" id="contact_logo">
              <img src="/img/contact.png" alt="contact" />
            </Link>
            <br />
            <Link to="/ma collection">Ma collection</Link>
            <hr />
            <Link to="/login">Connexion</Link>
          </dialog>
        </nav>
      </section>
      <hr className="line" />
    </header>
  );
};

export default Header;
