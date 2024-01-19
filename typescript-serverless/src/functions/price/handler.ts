import { functionHandler } from "@/libs/function";
import { Price } from "@/types.generated";

export const getListingPrices = functionHandler<Price[]>(
  async (event, { priceService }) => {
    const listingId = parseInt(event.pathParameters.id);
    return { statusCode: 200, response: await priceService.getAll(listingId) };
  }
);
