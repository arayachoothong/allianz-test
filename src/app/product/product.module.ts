import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxTableModule } from '@aposin/ng-aquila/table';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';
import { NxBadgeModule } from '@aposin/ng-aquila/badge';
import { ProductListComponent } from './product-list/product-list.component';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxDocumentationIconModule } from '@aposin/ng-aquila/documentation-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxDatefieldModule } from '@aposin/ng-aquila/datefield';
import { NxIsoDateModule } from '@aposin/ng-aquila/iso-date-adapter';
import { NxNativeDateModule } from '@aposin/ng-aquila/datefield';
import { NxMomentDateModule } from '@aposin/ng-aquila/moment-date-adapter';

@NgModule({
  declarations: [
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NxButtonModule,
    NxTableModule,
    NxLinkModule,
    NxPaginationModule,
    NxBadgeModule,
    NxIconModule,
    NxDocumentationIconModule,
    ReactiveFormsModule,
    NxInputModule,
    NxFormfieldModule,
    NxDropdownModule,
    NxDatefieldModule,
    NxMomentDateModule,
    NxNativeDateModule,
    NxIsoDateModule
  ]
})
export class ProductModule { }
