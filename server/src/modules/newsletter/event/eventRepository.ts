import databaseClient, { type Rows } from "../../../../database/client";

class EventRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(`
            SELECT * FROM event`);
    return rows;
  }
}

export default new EventRepository();
