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
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default UsersSection;
