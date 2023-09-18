import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { CreateinvoiceComponent } from './createinvoice/createinvoice.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { MedRepComponent } from './med-rep/med-rep.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { DistributorComponent } from './distributor/distributor.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BodyComponent } from './body/body.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { component: UserLoginComponent, path: 'login' },
  { component: DashboardComponent, path: 'dashboard' },
  { component: ListingComponent, path: 'listing' },
  { component: ProductsComponent, path: 'products' },
  { component: MedRepComponent, path: 'medrep' },
  { component: PharmacyComponent, path: 'pharmacy' },
  { component: DistributorComponent, path: 'distributor' },
  { component: CreateinvoiceComponent, path: 'createinvoice' },
  { component: CreateinvoiceComponent, path: 'editinvoice/:invoiceno' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
