import { Link } from "react-router";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <hr className="footer-line" />
      <nav className="banner-footer" aria-label="Réseaux sociaux">
        <Link to="/cgv">
          <button type="button">CGV</button>
        </Link>
        <ul className="social-icons">
          <li>
            <a href="https://www.instagram.com/" target="blank">
              <img src="/image/instagram.png" alt="logo instagram" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/" target="blank">
              <img src="/image/facebook.png" alt="logo facebook" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/" target="blank">
              <img src="/image/linkedin.png" alt="logo linkedin" />
            </a>
          </li>
          <li>
            <a href="https://x.com/" target="blank">
              <img src="/image/twitter.png" alt="logo twitter" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
export default Footer;
