import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private id: number = 1;
  constructor(private http: HttpClient) {}
  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }
  Getmedrep() {
    return this.http.get('http://www.spocorder.somee.com/api/User/MedRep');
  }
  Getmedrepbycode(code: any) {
    return this.http.get(
      'http://www.spocorder.somee.com/api/User/All-MedRep/GetByCode?Code=' +
        code
    );
  }
  Getdm() {
    return this.http.get('http://www.spocorder.somee.com/api/User/DM');
  }
  getdmbycode(code: any) {
    return this.http.get(
      'http://www.spocorder.somee.com/api/dm/GetByCode?Code=' + code
    );
  }

  Getcountry() {
    return this.http.get('http://www.spocorder.somee.com/api/Country');
  }
  Getcountrybycode(code: any) {
    return this.http.get(
      'http://www.spocorder.somee.com/api/Country/GetByCode?Code=' + code
    );
  }
  GetAddress() {
    return this.http.get('http://www.spocorder.somee.com/api/Branch');
  }
  GetAddressbycode(code: any) {
    return this.http.get(
      'http://www.spocorder.somee.com/api/Branch/GetByCode?Code=' + code
    );
  }
  GetPharmacy() {
    return this.http.get('http://www.spocorder.somee.com/api/Pharmacy');
  }
  GetPharmacybycode(code: any) {
    return this.http.get(
      'http://www.spocorder.somee.com/api/Pharmacy/GetByCode?Code=' + code
    );
  }
  GetCustomer() {
    return this.http.get('http://www.spocorder.somee.com/api/Distributor');
  }
  GetCustomerbycode(code: any) {
    return this.http.get(
      'http://www.spocorder.somee.com/api/Distributor/GetByCode?Code=' + code
    );
  }
  GetProducts() {
    return this.http.get('http://www.spocorder.somee.com/api/Product');
  }
  GetProductbycode(code: any) {
    return this.http.get('http://www.spocorder.somee.com/api/Product/' + code);
  }

  GetAllInvoice() {
    return this.http.get('https://localhost:4200/Invoice/GetAllHeader');
  }

  GetInvHeaderbycode(invoiceno: any) {
    return this.http.get(
      'https://localhost:4200/Invoice/GetAllHeaderbyCode?invoiceno=' + invoiceno
    );
  }
  GetInvDetailbycode(invoiceno: any) {
    return this.http.get(
      'https://localhost:4200/Invoice/GetAllDetailbyCode?invoiceno=' + invoiceno
    );
  }
  RemoveInvoice(invoiceno: any) {
    return this.http.delete(
      'https://localhost:4200/Invoice/Remove?invoiceno=' + invoiceno
    );
  }

  SaveInvoice(invoicedata: any) {
    return this.http.post(
      'http://www.spocorder.somee.com/api/Order',
      invoicedata
    );
  }

  Onlogin(logindata: any) {
    return this.http.post(
      'http://www.spocorder.somee.com/api/User/o2login',
      logindata
    );
  }

  GenerateInvoicePDF(invoiceno: any) {
    return this.http.get(
      'https://localhost:4200/Invoice/generatepdf?InvoiceNo=' + invoiceno,
      { observe: 'response', responseType: 'blob' }
    );
  }
}
