import type { Rows } from "../../../database/client";
import databaseClient, { type Result } from "../../../database/client";

class ArtworkRepository {
  async readAll() {
    const [result] = await databaseClient.query<Rows>("SELECT * from artwork");
    return result;
  }

  async readArtworkById(artworkId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM artwork WHERE id = ?",
      [artworkId],
    );
    return rows;
  }

  async readArtworkCategory(categoryName: string) {
    const [result] = await databaseClient.query<Rows>(
      `SELECT 
      a.id,
      a.image,
      a.title,
      a.price,
      CONCAT(ua.firstname, ' ', ua.lastname) AS artist_name,
      GROUP_CONCAT(DISTINCT CASE WHEN c.name <> ? THEN c.name END SEPARATOR ' - ') AS tags
   FROM artwork AS a
   JOIN artwork_category AS ac ON a.id = ac.artwork_id
   JOIN category AS c ON ac.category_id = c.id
   JOIN user_account AS ua ON a.user_account_id = ua.id
   WHERE a.id IN (
       SELECT a2.id
       FROM artwork AS a2
       JOIN artwork_category AS ac2 ON a2.id = ac2.artwork_id
       JOIN category AS c2 ON ac2.category_id = c2.id
       WHERE c2.name = ?
   )
   GROUP BY a.id;`,
      [categoryName, categoryName],
    );
    return result;
  }

  async readArtworkWithArtistById(artworkId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        artwork.*,
        user_account.firstname AS firstname,
        user_account.lastname AS lastname,
        user_account.image AS artist_image
      FROM artwork
      JOIN user_account ON artwork.user_account_id = user_account.id
      WHERE artwork.id = ?`,
      [artworkId],
    );
    return rows;
  }

  async readUserAccount(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * from artwork WHERE user_account_id = ?",
      [id],
    );
    return rows;
  }
  async readArtworkUserById(userId: number, artworkId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM artwork WHERE user_account_id = ? AND artwork.id = ?",
      [userId, artworkId],
    );
    return rows;
  }

  async createArtwork(body: Artwork) {
    if (!body.mainCategory || body.mainCategory.trim() === "") {
      throw new Error("La catégorie principale est obligatoire");
    }

    // 1. Insertion de l'œuvre
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO artwork (title, description, price, image, user_account_id) VALUES (?, ?, ?, ?, ?)",
      [
        body.title,
        body.description,
        body.price,
        body.image,
        body.user_account_id,
      ],
    );

    const artworkId = result.insertId;

    // 2. Ajout de la catégorie principale si présente
    if (body.mainCategory) {
      const [mainRows] = await databaseClient.query<Rows>(
        "SELECT id FROM category WHERE name = ? AND is_sub_cat = FALSE",
        [body.mainCategory],
      );

      let mainCategoryId: number;

      if (mainRows.length > 0) {
        mainCategoryId = (mainRows[0] as { id: number }).id;
      } else {
        const [insertMain] = await databaseClient.query<Result>(
          "INSERT INTO category (name, is_sub_cat) VALUES (?, FALSE)",
          [body.mainCategory],
        );
        mainCategoryId = insertMain.insertId;
      }

      // Liaison de l'œuvre avec la catégorie principale
      await databaseClient.query<Result>(
        "INSERT INTO artwork_category (artwork_id, category_id) VALUES (?, ?)",
        [artworkId, mainCategoryId],
      );
    }

    // 2. Si on a des tags à ajouter
    if (body.tags && body.tags.length > 0) {
      for (const tagName of body.tags) {
        // Vérifier si la catégorie/tag existe déjà
        const [rows] = await databaseClient.query<Rows>(
          "SELECT id FROM category WHERE name = ?",
          [tagName],
        );

        let categoryId: number;

        if (rows.length > 0) {
          // Tag existant
          categoryId = (rows[0] as { id: number }).id;
        } else {
          // Tag inexistant => création
          const [insertCatResult] = await databaseClient.query<Result>(
            "INSERT INTO category (name) VALUES (?)",
            [tagName],
          );
          categoryId = insertCatResult.insertId;
        }

        // Liaison œuvre <-> catégorie
        await databaseClient.query<Result>(
          "INSERT INTO artwork_category (artwork_id, category_id) VALUES (?, ?)",
          [artworkId, categoryId],
        );
      }
    }

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM artwork WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
  async readCarouselArtwork(categoryName: string) {
    const [result] = await databaseClient.query<Rows>(
      `
      SELECT id, image, sub_category_name
      FROM (
          SELECT 
              a.id,
              a.image,
              c_sub.name AS sub_category_name,
              ROW_NUMBER() OVER (PARTITION BY c_sub.id ORDER BY a.id) AS rn,
              ROW_NUMBER() OVER (PARTITION BY a.id ORDER BY c_sub.id) AS rn_artwork
          FROM artwork AS a
          JOIN artwork_category AS ac_sub ON ac_sub.artwork_id = a.id
          JOIN category AS c_sub ON c_sub.id = ac_sub.category_id AND c_sub.is_sub_cat = TRUE
          JOIN artwork_category AS ac_main ON ac_main.artwork_id = a.id
          JOIN category AS c_main ON c_main.id = ac_main.category_id 
              AND c_main.is_sub_cat = FALSE 
              AND c_main.name = ?
          WHERE a.is_validated = TRUE
      ) AS RankedArtworks
      WHERE rn = 1 AND rn_artwork = 1
      LIMIT 10;
    `,
      [categoryName],
    );
    return result;
  }
  async update(artwork: Artwork) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE artwork SET title = ?, description = ?, price = ?, image = ? 
      WHERE id = ?`,
      [
        artwork.title,
        artwork.description,
        artwork.price,
        artwork.image,
        artwork.id,
      ],
    );
    return result.affectedRows;
  }
}

export default new ArtworkRepository();
