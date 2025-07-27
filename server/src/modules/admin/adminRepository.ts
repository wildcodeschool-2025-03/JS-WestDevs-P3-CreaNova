import databaseClient, {
  type Result,
  type Rows,
} from "../../../database/client";

interface New {
  id: number;
  title: string;
  image: string;
  text: string;
  created_by: number;
}
interface Event {
  id: number;
  title: string;
  image: string;
  text: string;
  date: string;
  created_by: number;
}
class AdminRepository {
  async readAllUsers() {
    const [rows] = await databaseClient.query<Rows>(`
        SELECT * FROM user_account`);
    return rows;
  }
  async deleteUser(id: number) {
    const [result] = await databaseClient.query<Result>(
      `
      DELETE FROM user_account WHERE id = ?`,
      [id],
    );
    return result.affectedRows;
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
  async updateNew(news: New) {
    const [result] = await databaseClient.query<Result>(
      `
      UPDATE news 
      SET title = ?, image = ?,
      text = ?, created_by = ?
      WHERE id = ?`,
      [news.title, news.image, news.text, 8, news.id],
    );
    return result.affectedRows;
  }
  async readAllEvents() {
    const [rows] = await databaseClient.query<Rows>(`
        SELECT * FROM event`);
    return rows;
  }
  async updateEvent(event: Event) {
    const [result] = await databaseClient.query<Result>(
      `
      UPDATE event
      SET title = ?, image = ?,
      text = ?, date = ?, 
      created_by = ?
      WHERE id = ?`,
      [event.title, event.image, event.text, event.date, 8, event.id],
    );
    return result.affectedRows;
  }
}

export default new AdminRepository();
