// Http testing module and mocking controller
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import {
  ProductRequest,
  ProductResponse,
  Contract,
} from '../model/product.model';
import { ApiService } from 'src/app/config';
import { Observable, of } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let valueServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['get', 'put']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService, { provide: ApiService, useValue: spy }],
    });

    service = TestBed.inject(ProductService);
    valueServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAll should return value from observable', (done: DoneFn) => {
    const stubValue: Observable<any> = of({
      count: 0,
      items: [],
    });
    valueServiceSpy.get.and.returnValue(stubValue);

    let pagination: ProductRequest = { limit: 10, page: 0 };
    service.getAll(pagination).subscribe((value: ProductResponse) => {
      expect(value)
        .withContext('service returned stub value')
        .toEqual({ count: 0, items: [] });
      expect(valueServiceSpy.get.calls.count())
        .withContext('spy method was called once')
        .toBe(1);
      expect(valueServiceSpy.get.calls.mostRecent().returnValue).toBe(
        stubValue
      );
      done();
    });
  });

  it('#update should return value from observable', (done: DoneFn) => {
    const stubValue: Observable<Contract> = of({
      id: '1',
      product: 'Product',
      price: 1000,
      website: 'www.google.com',
      endingAt: new Date(),
      status: 'AVL',
      statusText: 'AVAILABLE',
      isEdit: true,
    });
    valueServiceSpy.put.and.returnValue(stubValue);

    let contract: Contract = {
      id: '1',
      product: 'Product',
      price: 1000,
      website: 'www.google.com',
      endingAt: new Date(),
      status: 'AVL',
      statusText: 'AVAILABLE',
      isEdit: true,
    };
    service.update(contract).subscribe((value: Contract) => {
      expect(value)
        .withContext('service returned stub value')
        .toEqual({ ...contract });
      expect(valueServiceSpy.put.calls.count())
        .withContext('spy method was called once')
        .toBe(1);
      expect(valueServiceSpy.put.calls.mostRecent().returnValue).toBe(
        stubValue
      );
      done();
    });
  });
});
