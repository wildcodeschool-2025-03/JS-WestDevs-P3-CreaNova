import { useEffect, useState } from "react";
interface Users {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}
function UsersSection() {
  const [users, setUsers] = useState<Users[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const usersPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:3310/api/admin/users", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
    );
    if (!confirmDelete) return;
    fetch(`http://localhost:3310/api/admin/user/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      }
    });
  };

  if (!users) {
    return <h1>non</h1>;
  }

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();
    return (
      user.firstname.toLowerCase().includes(query) ||
      user.lastname.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIdx = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIdx, startIdx + usersPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section>
      <input
        type="text"
        placeholder="Rechercher par prénom, nom ou email..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />
      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>
                <button type="button" onClick={() => handleDelete(user.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          type="button"
          className="not-delete-cancel-button"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          className="not-delete-cancel-button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
    </section>
  );
}

export default UsersSection;
