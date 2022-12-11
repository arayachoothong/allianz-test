// Http testing module and mocking controller
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

describe('ProductService', () => {
  let service: ApiService;
  let valueHttpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'post', 'delete']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, { provide: HttpClient, useValue: spy }],
    });

    service = TestBed.inject(ApiService);
    valueHttpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get successfully', (done: DoneFn) => {
    const stubValue: Observable<any> = of({
      count: 0,
      items: [],
    });
    valueHttpClientSpy.get.and.returnValue(stubValue);
    service.get('string').subscribe((value: any) => {
      expect(value)
        .withContext('service returned stub value')
        .toEqual({ count: 0, items: [] });
      expect(valueHttpClientSpy.get.calls.count())
        .withContext('spy method was called once')
        .toBe(1);
      expect(valueHttpClientSpy.get.calls.mostRecent().returnValue).toBe(
        stubValue
      );
      done();
    });
  });

  it('should put successfully', (done: DoneFn) => {
    const stubValue: Observable<any> = of({
      count: 0,
      items: [],
    });
    valueHttpClientSpy.put.and.returnValue(stubValue);
    service.put('string').subscribe((value: any) => {
      expect(value)
        .withContext('service returned stub value')
        .toEqual({ count: 0, items: [] });
      expect(valueHttpClientSpy.put.calls.count())
        .withContext('spy method was called once')
        .toBe(1);
      expect(valueHttpClientSpy.put.calls.mostRecent().returnValue).toBe(
        stubValue
      );
      done();
    });
  });

  it('should post successfully', (done: DoneFn) => {
    const stubValue: Observable<any> = of({
      count: 0,
      items: [],
    });
    valueHttpClientSpy.post.and.returnValue(stubValue);
    service.post('string').subscribe((value: any) => {
      expect(value)
        .withContext('service returned stub value')
        .toEqual({ count: 0, items: [] });
      expect(valueHttpClientSpy.post.calls.count())
        .withContext('spy method was called once')
        .toBe(1);
      expect(valueHttpClientSpy.post.calls.mostRecent().returnValue).toBe(
        stubValue
      );
      done();
    });
  });

  it('should delete successfully', (done: DoneFn) => {
    const stubValue: Observable<any> = of({
      count: 0,
      items: [],
    });
    valueHttpClientSpy.delete.and.returnValue(stubValue);
    service.delete('string').subscribe((value: any) => {
      expect(value)
        .withContext('service returned stub value')
        .toEqual({ count: 0, items: [] });
      expect(valueHttpClientSpy.delete.calls.count())
        .withContext('spy method was called once')
        .toBe(1);
      expect(valueHttpClientSpy.delete.calls.mostRecent().returnValue).toBe(
        stubValue
      );
      done();
    });
  });

});
