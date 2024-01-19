import { functionHandler } from "@/libs/function";
import { getRepository } from "@/repositories/listings";
import { getRepository as getPricesRepository } from "@/repositories/prices";
import { Listing, ListingWrite } from "@/types.generated";
import { EntityNotFound, NotFound } from "@/libs/errors";

export const getListings = functionHandler<Listing[]>(
  async (_event) => {
    const repository = await getRepository();
    const listings = await repository.getAllListings();

    return { statusCode: 200, response: listings };
  }
);

export const addListing = functionHandler<Listing, ListingWrite>(
  async (event) => {
    const repository = await getRepository();
    const listing = await repository.insertListing(event.body);

    const pricesRepository = await getPricesRepository();
    await pricesRepository.updatePricesHistory(listing);

    return { statusCode: 201, response: listing };
  }
);

export const updateListing = functionHandler<Listing, ListingWrite>(
  async (event) => {
    try {
      const repository = await getRepository();
      const listing = await repository.updateListing(
        parseInt(event.pathParameters.id),
        event.body
      );

      const pricesRepository = await getPricesRepository();
      await pricesRepository.updatePricesHistory(listing);

      return { statusCode: 200, response: listing };
    } catch (e) {
      if (e instanceof EntityNotFound) {
        throw new NotFound(e.message);
      }

      throw e;
    }
  }
);
