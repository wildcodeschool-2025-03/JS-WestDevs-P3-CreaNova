import "./Footer.css";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="banner-footer">
      <Link to="/">
        <p>à propos</p>
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
    </footer>
  );
}
export default Footer;
