import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class favoriteRepository {
  async readAll() {
    const [result] = await databaseClient.query<Rows>("SELECT * from favorite");
    return result;
  }

  async readByUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM favorite join artwork on artwork.id= favorite.artwork_id WHERE favorite.user_account_id = ?",
      [userId],
    );
    return rows;
  }
}

export default new favoriteRepository();
