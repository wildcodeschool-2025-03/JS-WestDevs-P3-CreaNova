import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class artworkRepository {
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
}

export default new artworkRepository();
