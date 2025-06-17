import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class userRepository {
  async readAll() {
    const [result] = await databaseClient.query<Rows>(
      "SELECT * from user_account",
    );
    return result;
  }

  async create(body: User) {
    const [user] = await databaseClient.query<Result>(
      "INSERT INTO user_account (name, email, password, street, city, zip_code, country, is_artist) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        body.name,
        body.email,
        body.password,
        body.street,
        body.city,
        body.zip_code,
        body.country,
        body.is_artist,
      ],
    );
    return user.affectedRows;
  }
}

export default new userRepository();
