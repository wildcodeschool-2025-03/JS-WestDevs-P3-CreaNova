import type { ResultSetHeader } from "mysql2";
import databaseClient, { type Rows } from "../../../database/client";
interface Purchase {
  user_account_id: number;
  artwork_id: number;
  means_of_payment: string;
}

class PurchaseRepository {
  async readAll() {
    const [result] = await databaseClient.query<Rows>("SELECT * FROM purchase");
    return result;
  }

  async create(body: Purchase) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();
      // Vérif en cas de double achat
      const [updateResult] = await connection.query<ResultSetHeader>(
        `UPDATE artwork 
        SET sold = true 
        WHERE id = ? 
        AND sold = false`,
        [body.artwork_id],
      );
      if (!updateResult || updateResult.affectedRows === 0) {
        await connection.rollback();
        throw new Error("Artwork already sold");
      }
      // Achat
      await connection.query<ResultSetHeader>(
        `
        INSERT INTO purchase 
        (user_account_id, artwork_id, means_of_payment, payment_validated)
        VALUES (?, ?, ?, ?)
        `,
        [body.user_account_id, body.artwork_id, body.means_of_payment, true],
      );
      await connection.commit();
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}

export default new PurchaseRepository();
