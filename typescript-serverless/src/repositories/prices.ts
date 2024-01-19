import PostgresClient from "serverless-postgres";
import { Listing, ListingWrite, Price } from "@/types.generated";
import { extractVariables } from "@/libs/postgres";
import { EntityNotFound } from "@/libs/errors";

interface PriceTableRow {
  id?: number;
  created_date: Date;
  price: number;
  listing_id: number;
};

function tableRowToPrice(row: PriceTableRow): Price {
  return {
    price_eur: row.price,
    created_date: row.created_date.toISOString(),
  };
}


export function getRepository(postgres: PostgresClient) {
  return {
    async getHistoryPrices(listingId: number): Promise<Price[]> {
      const queryString = `SELECT * FROM prices where listing_id = $1`;
      const queryValues = [listingId];

      const result = await postgres.query(queryString, queryValues);

      return result.rows.map(tableRowToPrice);
    },
  };
}
