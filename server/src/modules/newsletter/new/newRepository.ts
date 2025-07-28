import databaseClient, { type Rows } from "../../../../database/client";

class NewRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(`
            SELECT * FROM news`);
    return rows;
  }
}

export default new NewRepository();
