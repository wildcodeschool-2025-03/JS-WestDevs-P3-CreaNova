import ArtworksSection from "./ArtworksSection";
import UsersSection from "./UsersSection";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <main className="admin-dashboard">
      <h1>Dashboard</h1>
      <UsersSection />
      <ArtworksSection />
    </main>
  );
}

export default AdminDashboard;
