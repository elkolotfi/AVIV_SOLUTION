import { functionHandler } from "@/libs/function";
import { getRepository } from "@/repositories/listings";
import { getRepository as getPricesRepository } from "@/repositories/prices";
import { Listing, ListingWrite } from "@/types.generated";
import { EntityNotFound, NotFound } from "@/libs/errors";

export const getListings = functionHandler<Listing[]>(
  async (_event, { listingService }) => {
    return { statusCode: 200, response: await listingService.getAll() };
  }
);

export const addListing = functionHandler<Listing, ListingWrite>(
  async (event, { listingService }) => {
    const listingWrite = event.body;

    return { statusCode: 201, response: await listingService.insert(listingWrite) };
  }
);

export const updateListing = functionHandler<Listing, ListingWrite>(
  async (event, { listingService }) => {
    try {
      const listingId = parseInt(event.pathParameters.id);
      const listingWrite = event.body;

      return { statusCode: 200, response: await listingService.update(listingId, listingWrite) };
    } catch (e) {
      if (e instanceof EntityNotFound) {
        throw new NotFound(e.message);
      }

      throw e;
    }
  }
);
