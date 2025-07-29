import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class favoriteRepository {
  async readAll() {
    const [result] = await databaseClient.query<Rows>("SELECT * from favorite");
    return result;
  }

  async readByUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
  a.*,
  ua.firstname,
  ua.lastname,
  ua.image AS artist_image
FROM favorite AS f
JOIN artwork AS a ON a.id = f.artwork_id 
JOIN user_account AS ua ON a.user_account_id = ua.id
WHERE f.user_account_id = ?;`,
      [userId],
    );
    return rows;
  }

  async create(userId: number, artworkId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "INSERT IGNORE INTO favorite (user_account_id, artwork_id) VALUES (?, ?)",
      [userId, artworkId],
    );
    return rows;
  }
  async delete(userId: number, artworkId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      DELETE FROM favorite 
      WHERE user_account_id = ? 
      AND artwork_id = ?`,
      [userId, artworkId],
    );
    return rows;
  }
}

export default new favoriteRepository();
