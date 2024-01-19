import { ListingRepository, getRepository } from "@/repositories/listings";
import { PriceRepository, getRepository as getPricesRepository } from "@/repositories/prices";
import { Listing, ListingWrite } from "@/types.generated";

export class ListingService {
    private static instance: ListingService;
    
    private constructor(
        private listingsRepository: ListingRepository,
        private pricesRepository: PriceRepository,
    ) {}

    static async getInstance(): Promise<ListingService> {
        if (!ListingService.instance) {
            const listingsRepository = await getRepository();
            const pricesRepository = await getPricesRepository();

            ListingService.instance = new ListingService(listingsRepository, pricesRepository);
        }

        return ListingService.instance;
    }


    async getAll(): Promise<Listing[]> {
        return await this.listingsRepository.getAllListings();
    }

    async insert(listingWrite: ListingWrite): Promise<Listing> {
        const listing = await this.listingsRepository.insertListing(listingWrite);

        await this.pricesRepository.updatePricesHistory(listing);

        return listing;
    }

    async update(listingId: number, listingWrite: ListingWrite): Promise<Listing> {
        const listing = await this.listingsRepository.updateListing(listingId, listingWrite);

        await this.pricesRepository.updatePricesHistory(listing);

        return listing;
    }

}