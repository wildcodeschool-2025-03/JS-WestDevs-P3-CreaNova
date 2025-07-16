import type { ResultSetHeader } from "mysql2";
import databaseClient, { type Rows } from "../../../database/client";

class PurchaseRepository {
  async readAll() {
    const [result] = await databaseClient.query<Rows>("SELECT * FROM purchase");
    return result;
  }

  async create(body: Purchase) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      for (const artwork_id of body.artwork_ids) {
        const [updateResult] = await connection.query<ResultSetHeader>(
          `UPDATE artwork 
          SET sold = true 
          WHERE id = ? 
          AND sold = false`,
          [artwork_id],
        );

        if (!updateResult || updateResult.affectedRows === 0) {
          await connection.rollback();
          throw new Error(`Artwork ${artwork_id} already sold`);
        }

        await connection.query<ResultSetHeader>(
          `INSERT INTO purchase 
          (user_account_id, artwork_id, means_of_payment, payment_validated)
          VALUES (?, ?, ?, ?)`,
          [body.user_account_id, artwork_id, body.means_of_payment, true],
        );
      }

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
