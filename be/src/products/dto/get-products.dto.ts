import { IsIn, IsNotEmpty } from "class-validator";

export enum SortOptions {
    newest = 'newest',
    oldest = 'oldest',
    priceasc = 'priceasc',
    pricedesc = 'pricedesc',
}

export class GetProductsDto {
    @IsNotEmpty()
    page: string;
  
    @IsIn([
      SortOptions.newest,
      SortOptions.oldest,
      SortOptions.priceasc,
      SortOptions.pricedesc,
    ])
    sort: SortOptions;

    limit: number;
  
    category?: string;
  
    search?: string;

    minPrice?: number;
  
    maxPrice?: number;
}