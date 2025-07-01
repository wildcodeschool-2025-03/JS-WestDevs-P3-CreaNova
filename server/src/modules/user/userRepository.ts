import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class userRepository {
  async readByEmail(email: string) {
    const [user] = await databaseClient.query<Rows>(
      "Select * FROM user_account WHERE email = ?",
      [email],
    );
    return user[0];
  }

  async readAll() {
    const [result] = await databaseClient.query<Rows>(
      "SELECT * from user_account",
    );
    return result;
  }
  async readArtists() {
    const [result] = await databaseClient.query<Rows>(
      `SELECT ua.* FROM user_account AS ua
      LEFT JOIN artwork AS a ON ua.id = a.user_account_id
      WHERE ua.is_artist = TRUE
      AND (ua.description IS NOT NULL 
      OR a.id IS NOT NULL)
      GROUP BY ua.id`,
    );
    return result;
  }

  async readArtistArtworks(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT ua.*, ua.description AS artist_description, ua.image AS artist_image, 
      a.*, a.description AS artwork_description, a.image AS artwork_image 
      FROM user_account AS ua 
      JOIN artwork AS a 
      ON ua.id = a.user_account_id WHERE ua.id = ?`,
      [id],
    );
    return rows;
  }

  async create(body: User) {
    const [user] = await databaseClient.query<Result>(
      "INSERT INTO user_account (firstname, lastname, email, password, is_artist, confidentiality) VALUES (?, ?, ?, ?, ?, ?)",
      [
        body.firstname,
        body.lastname,
        body.email,
        body.password,
        body.is_artist,
        body.confidentiality,
      ],
    );
    return user.affectedRows;
  }
  async updateId(id: number, body: Partial<User>) {
    const [currentUser] = await databaseClient.query<Rows>(
      "SELECT * FROM user_account WHERE id = ?",
      [id],
    );
    if (!currentUser[0]) {
      return 0;
    }
    const firstname = body.firstname ?? currentUser[0].firstname;
    const lastname = body.lastname ?? currentUser[0].lastname;
    const email = body.email ?? currentUser[0].email;
    const street = body.street ?? currentUser[0].street;
    const city = body.city ?? currentUser[0].city;
    const zip_code = body.zip_code ?? currentUser[0].zip_code;
    const country = body.country ?? currentUser[0].country;
    const image = body.image ?? currentUser[0].image;
    const description = body.description ?? currentUser[0].description;

    const sql = `
      UPDATE user_account
      SET firstname = ?, lastname = ?, email = ?, street = ?, city = ?, zip_code = ?, country = ?, image = ?, description = ?
      WHERE id = ?
    `;

    const values = [
      firstname,
      lastname,
      email,
      street,
      city,
      zip_code,
      country,
      image,
      description,
      id,
    ];

    const [result] = await databaseClient.query<Result>(sql, values);
    return result.affectedRows;
  }
}

export default new userRepository();
