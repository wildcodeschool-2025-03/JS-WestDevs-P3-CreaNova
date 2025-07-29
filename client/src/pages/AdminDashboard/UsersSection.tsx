import { useEffect, useState } from "react";
interface Users {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}
function UsersSection() {
  const [users, setUsers] = useState<Users[]>([]);

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
  return (
    <section>
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
          {users.map((user) => (
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
    </section>
  );
}

export default UsersSection;
