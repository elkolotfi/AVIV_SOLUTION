import {
  PriceRepository,
  getRepository as getPricesRepository,
} from "@/repositories/prices";
import { Listing, ListingWrite, Price } from "@/types.generated";

export class PriceService {
  private static instance: PriceService;

  private constructor(private pricesRepository: PriceRepository) {}

  static async getInstance(): Promise<PriceService> {
    if (!PriceService.instance) {
      const pricesRepository = await getPricesRepository();

      PriceService.instance = new PriceService(pricesRepository);
    }

    return PriceService.instance;
  }

  async getAll(listingId: number): Promise<Price[]> {
    return await this.pricesRepository.getPricesHistory(listingId);
  }
}
