import EventsSection from "./EventsSection";
import NewsSection from "./NewsSection";
import UsersSection from "./UsersSection";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <main className="admin-dashboard-main">
      <h1>test</h1>
      <UsersSection />
      <NewsSection />
      <EventsSection />
    </main>
  );
}

export default AdminDashboard;
