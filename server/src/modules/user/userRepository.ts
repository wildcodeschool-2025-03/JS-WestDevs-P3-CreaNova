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
      "SELECT * from user_account WHERE is_artist = TRUE",
    );
    return result;
  }

  async readArtistArtworks(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT ua.*, ua.description AS artist_description, a.*, a.description AS artwork_description 
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
}

export default new userRepository();
