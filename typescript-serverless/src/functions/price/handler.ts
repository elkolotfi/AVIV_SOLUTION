import { functionHandler } from "@/libs/function";
import { getRepository } from "@/repositories/prices";
import { Price } from "@/types.generated";

export const getListingPrices = functionHandler<Price[]>(
  async (event) => {
    const repository = await getRepository();

    const listingIdParam = parseInt(event.pathParameters.id);
    const response = await repository.getPricesHistory(listingIdParam);

    return {
      statusCode: 200,
      response,
    };
  }
);
