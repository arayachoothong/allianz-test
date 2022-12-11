import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../services/product.service';
import { Observable, of, throwError } from 'rxjs';
import {
  ProductResponse,
  ProductRequest,
  Contract,
} from '../model/product.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let valueServiceSpy: jasmine.SpyObj<ProductService>;

  let productService: ProductService;
  let productServiceStub: Partial<ProductService>;
  const mockupProduct: Contract = {
    id: '1',
    product: 'Car',
    price: 1234,
    website: 'www.example.com',
    endingAt: new Date('1/3/2020'),
    status: 'negative',
    statusText: 'open',
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductService', ['getAll', 'update']);
    productServiceStub = {
      getAll(pagination: ProductRequest) {
        return of({
          count: 20,
          items: [mockupProduct],
        });
      },
      update(data: Contract) {
        return of({
          ...mockupProduct,
        });
      },
    };

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        { provide: ProductService, useValue: productServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    valueServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<
      ProductService
    >;
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should proceed to next page then previous page', () => {
    component.nextPage();
    expect(component.pagination.page).toBe(2);
    component.prevPage();
    expect(component.pagination.page).toBe(1);
  });

  it('should proceed to target page', () => {
    component.goToPage(15);
    expect(component.pagination.page).toBe(15);
  });

  it('should update selected record with success', () => {
    let data: Contract = {
      ...mockupProduct,
      isEdit: true,
    };
    component.updateProduct(data);
    expect(component.totalRecord).toBe(20);
  });

  it('should update isEdit field to be true', async () => {
    const index = 0;
    await component.getProductList();
    component.onEdit(index);
    expect(component.formArray.getRawValue()[index].isEdit).toBe(true);
  });

  it('should not update when validate form is failed', async () => {
    await component.getProductList();
    const index = 0;
    component.formArray.at(index).get('isEdit')?.patchValue(true);
    component.formArray.controls[index].markAllAsTouched();
    component.formArray.at(index).get('product')?.patchValue('');
    component.onSave(index);
    expect(component.formArray.getRawValue()[index].isEdit).toBe(true);
  });

  it('should update when validate form is pass', async () => {
    await component.getProductList();
    const index = 0;
    let data: Contract = {
      ...component.formArray.getRawValue()[index],
    };
    component.onEdit(index);
    component.onSave(index);
    expect(component.formArray.getRawValue()[index].isEdit).toBe(false);
  });

  it('should update status field when status change', async () => {
    await component.getProductList();
    const index = 0;
    let data: Contract = {
      ...component.formArray.getRawValue()[index],
    };
    component.onEdit(index);
    component.onStatusChange({ value: 'accepted' }, index);
    expect(component.formArray.getRawValue()[index].status).toBe('positive');
  });
});
