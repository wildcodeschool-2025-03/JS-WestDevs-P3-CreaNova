import databaseClient, {
  type Result,
  type Rows,
} from "../../../database/client";

class AdminRepository {
  async readAllUsers() {
    const [rows] = await databaseClient.query<Rows>(`
        SELECT * FROM user_account`);
    return rows;
  }
  async readAllArtworks() {
    const [rows] = await databaseClient.query<Rows>(`
        SELECT * FROM artwork`);
    return rows;
  }
  async deleteArtwork(id: number) {
    const [result] = await databaseClient.query<Result>(
      `
        DELETE FROM artwork WHERE id = ?`,
      [id],
    );
    return result.affectedRows;
  }
  async readAllCategories() {
    const [rows] = await databaseClient.query<Rows>(`
        SELECT * FROM category`);
    return rows;
  }
  async readAllPurchases() {
    const [rows] = await databaseClient.query<Rows>(`
        SELECT * FROM purchase`);
    return rows;
  }
  async readAllNews() {
    const [rows] = await databaseClient.query<Rows>(`
        SELECT * FROM news`);
    return rows;
  }
  async readAllEvents() {
    const [rows] = await databaseClient.query<Rows>(`
        SELECT * FROM event`);
    return rows;
  }
}

export default new AdminRepository();
