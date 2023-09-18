import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListingComponent } from './listing/listing.component';
import { CreateinvoiceComponent } from './createinvoice/createinvoice.component';
import{ReactiveFormsModule}from '@angular/forms';
import{HttpClientModule}from'@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import{NgxExtendedPdfViewerModule}from 'ngx-extended-pdf-viewer';
import{DataTablesModule}from'angular-datatables';
import { FormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login/user-login.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { MedRepComponent } from './med-rep/med-rep.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { DistributorComponent } from './distributor/distributor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import 'bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    ListingComponent,
    CreateinvoiceComponent,
    UserLoginComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ProductsComponent,
    MedRepComponent,
    PharmacyComponent,
    DistributorComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    DataTablesModule,
    NgbModule,
    NgxExtendedPdfViewerModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
