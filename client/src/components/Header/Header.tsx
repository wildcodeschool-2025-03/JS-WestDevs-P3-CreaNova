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
    <>
      <header className="header">
        <section className="menu-et-logo">
          <Menu
            isOpen={isOpen}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
          >
            <Link
              id="artistes"
              className="menu-item"
              to="/artistes"
              onClick={handleCloseMenu}
            >
              Artistes
            </Link>

            <Link
              id="peintures"
              className="menu-item"
              to="/peintures"
              onClick={handleCloseMenu}
            >
              Peintures
            </Link>

            <Link
              id="photographies"
              className="menu-item"
              to="/photographies"
              onClick={handleCloseMenu}
            >
              Photographies
            </Link>

            <Link
              id="dessins"
              className="menu-item"
              to="/dessins"
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
            <img className="logo" src="./img/black_logo.png" alt="logo-black" />
            <nav className="nav_categories">
              <button type="button">
                <Link to="/artistes">Artistes</Link>
              </button>

              <button type="button">
                <Link to="/peintures">Peintures</Link>
              </button>
              <button type="button">
                <Link to="/photographies">Photographies</Link>
              </button>

              <button type="button">
                <Link to="/dessins">Dessins</Link>
              </button>

              <button type="button">
                <Link to="/newsletter">Newsletter</Link>
              </button>
              <button type="button">
                <Link to="/a propos"> A propos</Link>
              </button>
            </nav>

            <nav className="nav_menu">
              <Link to="/dark_mode">
                <img src="./img/soleil.png" alt="dark_mode" />
              </Link>
              <Link to="/favoris">
                <img src="./img/amour-du-coeur.png" alt="coeur" />
              </Link>
              <Link to="/panier">
                <img src="./img/panier.png" alt="panier" />
              </Link>
              <Link to="/contact">
                <img src="./img/contact.png" alt="contact" />
              </Link>
            </nav>
          </section>
        </section>
      </header>
      <hr />
    </>
  );
};

export default Header;
