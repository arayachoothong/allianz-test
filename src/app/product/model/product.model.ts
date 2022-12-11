export interface Contract {
  id: string;
  product: string;
  price: number;
  website: string;
  endingAt: Date;
  status: string;
  statusText: string;
  isEdit?: boolean;
}

export interface ProductResponse {
  count: number;
  items: Contract[];
}

export interface ProductRequest {
  limit: number;
  page: number;
}

export interface ProductStatus {
  status: string;
  statusText: string;
}
