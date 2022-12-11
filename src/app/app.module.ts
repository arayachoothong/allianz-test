import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NxFooterModule } from '@aposin/ng-aquila/footer';
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    NxFooterModule,
    ProductModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

/** Copyright Allianz 2022 */
