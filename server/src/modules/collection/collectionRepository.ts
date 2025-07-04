import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class CollectionRepository {
  async readAll() {
    const [result] = await databaseClient.query<Rows>("SELECT * from artwork");
    return result;
  }
}

export default new CollectionRepository();
