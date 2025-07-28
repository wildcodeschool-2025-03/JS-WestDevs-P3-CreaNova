import "./AdminDashboard.css";
import ArtworksSection from "./ArtworksSection";
import EventsSection from "./EventsSection";
import NewsSection from "./NewsSection";
import UsersSection from "./UsersSection";

function AdminDashboard() {
  return (
    <main className="admin-dashboard">
      <h1>Dashboard</h1>
      <UsersSection />
      <ArtworksSection />
      <NewsSection />
      <EventsSection />
    </main>
  );
}

export default AdminDashboard;
