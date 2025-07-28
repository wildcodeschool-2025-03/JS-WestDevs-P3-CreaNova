import EventsSection from "./EventsSection";
import "./NewsletterPage.css";
import NewsSection from "./NewsSection";
function Newsletter() {
  return (
    <main className="newsletter-page-main">
      <h1>Newsletter</h1>
      <NewsSection />
      <h2>Événement</h2>
      <EventsSection />
    </main>
  );
}

export default Newsletter;
