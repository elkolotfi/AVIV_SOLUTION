import { functionHandler } from "@/libs/function";
import { getRepository } from "@/repositories/prices";
import { Price } from "@/types.generated";

export const getListingPrices = functionHandler<Price[]>(
  async (event, { postgres }) => {
    const listingIdParam = parseInt(event.pathParameters.id);
    const response = await getRepository(postgres).getHistoryPrices(listingIdParam);

    return {
      statusCode: 200,
      response,
    };
});
