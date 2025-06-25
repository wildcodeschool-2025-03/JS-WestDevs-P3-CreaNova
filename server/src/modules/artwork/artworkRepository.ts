import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class ArtworkRepository {
  async readAll() {
    const [result] = await databaseClient.query<Rows>("SELECT * from artwork");
    return result;
  }

  async readValidated() {
    const [result] = await databaseClient.query<Rows>(
      "SELECT * from artwork WHERE is_validated = TRUE",
    );
    return result;
  }

  async readUserAccount() {
    const [result] = await databaseClient.query<Rows>(
      "SELECT * from artwork WHERE user_account_id = TRUE",
    );
    return result;
  }
}
export default new ArtworkRepository();
