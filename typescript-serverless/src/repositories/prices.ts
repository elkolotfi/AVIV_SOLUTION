import PostgresClient from "serverless-postgres";
import { Listing, Price } from "@/types.generated";
import { extractVariables, getPostgres } from "@/libs/postgres";

interface PriceTableRow {
  id?: number;
  created_date: Date;
  price: number;
  listing_id: number;
}

function tableRowToPrice(row: PriceTableRow): Price {
  return {
    price_eur: row.price,
    created_date: row.created_date.toISOString(),
  };
}

function listingToTableRow(listing: Listing): PriceTableRow {
  return {
    listing_id: listing.id,
    price: listing.latest_price_eur,
    created_date: new Date(),
  };
}

export async function getRepository() {
  const postgres: PostgresClient = await getPostgres();

  return {
    async getPricesHistory(listingId: number): Promise<Price[]> {
      const queryString = `SELECT * FROM prices where listing_id = $1`;
      const queryValues = [listingId];

      const result = await postgres.query(queryString, queryValues);

      return result.rows.map(tableRowToPrice);
    },
    async updatePricesHistory(listing: Listing): Promise<void> {
      const tableRow = listingToTableRow(listing);

      const {
        columns,
        variables,
        values: queryValues,
      } = extractVariables(tableRow);

      const queryString = `
        INSERT INTO prices (${columns.join(",")})
        VALUES(${variables})
        RETURNING *
      `;
      await postgres.query(queryString, queryValues);
    },
  };
}
