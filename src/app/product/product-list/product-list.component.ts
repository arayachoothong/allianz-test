import { Component, OnInit } from '@angular/core';
import {
  Contract,
  ProductResponse,
  ProductRequest,
  ProductStatus,
} from '../model/product.model';
import { ProductService } from '../services/product.service';
import {
  FormControl,
  UntypedFormArray,
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { NxIconRegistry } from '@aposin/ng-aquila/icon';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/de';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  totalRecord: number = 0;
  pagination: ProductRequest = {
    limit: 10,
    page: 1,
  };
  formArray: UntypedFormArray = new UntypedFormArray([]);
  statusList: ProductStatus[] = [
    {
      status: 'negative',
      statusText: 'open',
    },
    {
      status: 'positive',
      statusText: 'accepted',
    },
    {
      status: 'critical',
      statusText: 'rejected',
    },
  ];
  currencyCode: string = 'EUR';

  constructor(
    private productService: ProductService,
    private readonly nxIconRegistry: NxIconRegistry
  ) {}

  async ngOnInit(): Promise<void> {
    this.nxIconRegistry.registerFont('fa', 'fa', 'fa-');
    registerLocaleData(locale, 'de');
    await this.getProductList();
  }

  async getProductList() {
    await this.productService.getAll(this.pagination).subscribe(
      (data: ProductResponse) => {
        const { items, count } = data;
        this.totalRecord = count;
        if (items.length) this.onSetform(items);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  async updateProduct(data: Contract) {
    await this.productService.update(data).subscribe(
      async (data: Contract) => {
        await this.getProductList();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onSetform(items: Contract[]) {
    const regUrl = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    const formItem = items.map((val) => {
      return new UntypedFormGroup({
        id: new UntypedFormControl(val.id),
        product: new UntypedFormControl(val.product, [
          Validators.required,
          Validators.maxLength(20),
        ]),
        price: new UntypedFormControl(val.price, [Validators.required]),
        website: new UntypedFormControl(val.website, [
          Validators.required,
          Validators.pattern(regUrl),
        ]),
        endingAt: new UntypedFormControl(val.endingAt, [Validators.required]),
        status: new UntypedFormControl(val.status),
        statusText: new UntypedFormControl(val.statusText, [
          Validators.required,
        ]),
        isEdit: new UntypedFormControl(false),
      });
    });
    this.formArray = new UntypedFormArray(formItem);
  }

  async prevPage() {
    this.pagination.page--;
    await this.getProductList();
  }

  async nextPage() {
    this.pagination.page++;
    await this.getProductList();
  }

  async goToPage(n: number) {
    this.pagination.page = n;
    await this.getProductList();
  }

  onEdit(i: number): void {
    this.formArray.at(i).get('isEdit')?.patchValue(true);
  }

  onSave(i: number): void {
    if (this.formArray.at(i).touched && this.formArray.at(i).invalid) return;
    this.formArray.at(i).get('isEdit')?.patchValue(false);
    this.updateProduct(this.formArray.at(i).value);
  }

  getFormGroup(i: number): UntypedFormGroup {
    return this.formArray.controls[i] as UntypedFormGroup;
  }

  onStatusChange($event: any, i: number): void {
    const status = this.statusList.find((el) => el.statusText == $event.value)
      ?.status;

    this.formArray.at(i).get('status')?.patchValue(status);
  }
}
