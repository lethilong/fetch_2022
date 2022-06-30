export enum SortOptions {
    newest = 'newest',
    oldest = 'oldest',
    priceasc = 'priceasc',
    pricedesc = 'pricedesc',
}

export class GetProductsDto {
     
    sort: SortOptions;

    limit: number;
  
    category?: string;
  
    search?: string;

    minPrice?: number;
  
    maxPrice?: number;
}