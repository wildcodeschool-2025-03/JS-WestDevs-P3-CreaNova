import "./NotFound.css";
import { Link } from "react-router";
function NotFound() {
  return (
    <main className="notfound-container">
      <img src="/image/404.png" alt="page404" />
      <Link to="/">homepage</Link>
    </main>
  );
}
export default NotFound;
