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
      "INSERT INTO user_account (firstname, lastname, email, password, is_artist) VALUES (?, ?, ?, ?, ?)",
      [
        body.firstname,
        body.lastname,
        body.email,
        body.password,
        body.is_artist,
      ],
    );
    return user.affectedRows;
  }
}

export default new userRepository();
