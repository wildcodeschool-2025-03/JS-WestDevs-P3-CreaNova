import { data } from "react-router";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class ArtworkRepository {
  async readAll() {
    const [result] = await databaseClient.query<Rows>("SELECT * from artwork");
    return result;
  }

  async readArtworkCategory() {
    const [result] = await databaseClient.query<Rows>(
      "SELECT a.*, c.name, ua.firstname, ua.lastname FROM artwork AS a JOIN artwork_category AS ac ON a.id = ac.artwork_id JOIN category AS c ON ac.category_id = c.id JOIN user_account AS ua ON a.user_account_id = ua.id",
    );
    return result;
  }

  async readUserAccount(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * from artwork WHERE user_account_id = TRUE",
      [id],
    );
    return rows;
  }
}
export default new ArtworkRepository();
