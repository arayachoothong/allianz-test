import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/config';
import { ProductResponse, ProductRequest, Contract } from '../model/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService) {}

  getAll(pagination: ProductRequest): Observable<ProductResponse> {
    let queryParams = new HttpParams({ fromObject: { ...pagination } });
    return this.apiService
      .get('product', queryParams)
      .pipe(map((data) => data));
  }

  update(data: Contract): Observable<Contract> {
    return this.apiService
      .put(`product/${data.id}`, data)
      .pipe(map((data) => data));
  }
}
