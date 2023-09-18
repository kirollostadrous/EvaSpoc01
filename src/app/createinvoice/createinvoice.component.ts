import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms'
import { MasterService } from '../service/master.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { error } from 'jquery';


@Component({
  selector: 'app-createinvoice',
  templateUrl: './createinvoice.component.html',
  styleUrls: ['./createinvoice.component.css']
})
export class CreateinvoiceComponent implements OnInit {
  constructor(private builder: FormBuilder, private service: MasterService, private router: Router, private alert: ToastrService,
    private activeroute: ActivatedRoute) { }
  pagetitle = "New Order"
  invoicedetail !: FormArray<any>;
  invoiceproduct !: FormGroup<any>;
  mastermedrep: any;
  masterdm: any;
  mastercountry: any;
  mastercustomer: any;
  masterpharmacy: any;
  masterproduct: any;
  masterAddress: any;
  editinvoiceno: any;
  isedit = false;
  editinvdetail: any;
  price: number = 0;

  ngOnInit(): void {
    this.Getmedreps();
    this.Getdms();
    this.Getcountries();
    this.GetCustomers();
    this.GetProducts();
    this.GetPharmacies();
    this.GetAddress();


    this.editinvoiceno = this.activeroute.snapshot.paramMap.get('invoiceno');
    if (this.editinvoiceno != null) {
      this.pagetitle = "Edit Invoice";
      this.isedit = true;
      this.SetEditInfo(this.editinvoiceno);
    }
  }

  invoiceform = this.builder.group({
    countryId: this.builder.control('', Validators.required),
    medrepId: this.builder.control<string>('', Validators.required),
    dmId: this.builder.control('', Validators.required),
    invoiceNo: this.builder.control('', Validators.required),
    customerId: this.builder.control('', Validators.required),
    pharmacyId: this.builder.control('', Validators.required),
    addressId: this.builder.control('', Validators.required),
    countryName: this.builder.control(''),
    customerName: this.builder.control(''),
    medRepuserName: this.builder.control(''),
    PharmacyName: this.builder.control(''),
    dmuserName: this.builder.control(''),
    deliveryAddress: this.builder.control(''),
    remarks: this.builder.control(''),
    total: this.builder.control({ value: 0, disabled: true }),
    tax: this.builder.control({ value: 0, disabled: true }),
    netTotal: this.builder.control({ value: 0, disabled: true }),
    details: this.builder.array([])

  });

  SetEditInfo(invoiceno: any) {
    this.service.GetInvDetailbycode(invoiceno).subscribe(res => {
      this.editinvdetail = res;
      for (let i = 0; i < this.editinvdetail.length; i++) {
        this.addnewproduct();
      }
    });

    this.service.GetInvHeaderbycode(invoiceno).subscribe(res => {
      let editdata: any;
      editdata = res;
      if (editdata != null) {
        this.invoiceform.setValue({
          medrepId: editdata.medrepId,
          medRepuserName: editdata.medRepuserName,
          dmId: editdata.dmId,
          dmuserName: editdata.dmuserName,
          countryId: editdata.countryId,
          countryName: editdata.countryName,
          invoiceNo: editdata.invoiceNo,
          customerId: editdata.customerId,
          customerName: editdata.customerName,
          pharmacyId: editdata.pharmacyId,
          PharmacyName: editdata.PharmacyName,
          addressId: editdata.addressId,
          deliveryAddress: editdata.deliveryAddress,
          remarks: editdata.remarks,
          total: editdata.total,
          tax: editdata.tax,
          netTotal: editdata.netTotal,
          details: this.editinvdetail
        })
      }
    });
  }



  SaveInvoice() {
    if (this.invoiceform.valid) {

      const invoiceProductLength = Object.keys(this.invoiceproduct.controls).length;
      let list_product = [];

      for (let i = 0; i < invoiceProductLength; i++) {
        let product = this.invoicedetail.at(i) as FormGroup;

        if (product) {
          var obj = {
            "productId": parseInt(product.get("productCode")?.value || '0', 10) ?? 0,
            "quantity": parseInt(product.get("qty")?.value || '0', 10) ?? 0,
            "totalprice": parseInt(product.get("salesPrice")?.value || '0', 10) ?? 0,
          }
          list_product.push(obj);
        }
      }

      const requestBody = {
        "name": this.invoiceform.get('invoiceNo')?.value,
        "description": this.invoiceform.get("remarks")?.value,
        "medRepId": parseInt(this.invoiceform.get("medrepId")?.value || '0', 10),
        "dmId": parseInt(this.invoiceform.get("dmId")?.value || '0', 10),
        "pharmacyId": parseInt(this.invoiceform.get("pharmacyId")?.value || '0', 10),
        "branchId": parseInt(this.invoiceform.get("addressId")?.value || '0', 10),
        "countryId": parseInt(this.invoiceform.get("countryId")?.value || '0', 10),
        "orderProducts": list_product
      };
      console.log(requestBody);
      this.service.SaveInvoice(requestBody).subscribe((res) => {
        console.log(res);

        /* if (result.result === 'Created' || result.result === 'Updated') {
           if (this.isedit) {
             this.alert.success('Updated Successfully.', 'Invoice :' + result.kyValue);
          } else {
            this.alert.success('Created Successfully.', 'Invoice :' + result.kyValue);
          }
          this.router.navigate(['/']);
         } else {
           this.alert.error('Failed to save.', 'Invoice');
           console.log(result);
         }*/
      }, (error) => { console.log(error) });

    } else {
      this.alert.warning('Please enter values in all mandatory filed', 'Validation');
    }

  }
  addnewproduct() {
    this.invoicedetail = this.invoiceform.get("details") as FormArray;
    let countrycode = this.invoiceform.get("countryId")?.value;
    if (countrycode == null) {
      this.alert.warning('Please select the country first', 'Validation');
    } else {
      let invoiceno = this.invoiceform.get("invoiceNo")?.value;
      let customercode = this.invoiceform.get("customerId")?.value;
      let pharmacycode = this.invoiceform.get("pharmacyId")?.value;
      let addresscode = this.invoiceform.get("addressId")?.value;
      if (
        (invoiceno != null && invoiceno !== '') &&
        (customercode != null && customercode !== '') &&
        (pharmacycode != null && pharmacycode !== '') &&
        (addresscode != null && addresscode !== '') ||
        this.isedit
      ) {
        this.invoicedetail.push(this.Generaterow());
      } else if (
        (invoiceno != null && invoiceno !== '') &&
        (customercode != null && customercode !== '') &&
        (pharmacycode != null && pharmacycode !== '') &&
        (addresscode != null && addresscode !== '') ||
        this.isedit
      ) {
        this.invoicedetail.push(this.Generaterow());
      } else {
        this.alert.warning('Please select the required fields', 'Validation');
      }
    }
  }

  get invproducts() {
    return this.invoiceform.get("details") as FormArray;
  }

  Generaterow() {
    return this.builder.group({
      invoiceNo: this.builder.control(''),
      productCode: this.builder.control('', Validators.required),
      productName: this.builder.control(''),
      qty: this.builder.control(1),
      salesPrice: this.builder.control(0),
      total: this.builder.control({ value: 0, disabled: true })
    });
  }
  Getmedreps() {
    this.service.Getmedrep().subscribe(res => {
      this.mastermedrep = res;
    })
  }
  Getdms() {
    this.service.Getdm().subscribe(res => {
      this.masterdm = res;
    })
  }
  Getcountries() {
    this.service.Getcountry().subscribe(res => {
      this.mastercountry = res;
    })
  }
  GetAddress() {
    this.service.GetAddress().subscribe(res => {
      this.masterAddress = res;
    })
  }

  GetPharmacies() {
    this.service.GetPharmacy().subscribe(res => {
      this.masterpharmacy = res;
    })
  }
  GetCustomers() {
    this.service.GetCustomer().subscribe(res => {
      this.mastercustomer = res;
    })
  }

  GetProducts() {
    this.service.GetProducts().subscribe(res => {
      this.masterproduct = res;
    })
    console.log("master product", this.masterproduct)
  }
  countrychange() {
    let countrycode = this.invoiceform.get("countryId")?.value;
    this.service.Getcountry().subscribe(res => {
      let countrydata: any;
      countrydata = res;
      if (countrydata != null) {
        this.invoiceform.get("countryName")?.setValue(countrydata.name);
      }
    });
  }
  medrepschange() {
    let medrepcode = this.invoiceform.get("medrepId")?.value;
    this.service.Getmedrep().subscribe(res => {
      let meddata: any;
      meddata = res;
      if (meddata != null) {
        this.invoiceform.get("medRepuserName")?.setValue(meddata.userName);
      }
    });
  }
  dmchange() {
    let dmcode = this.invoiceform.get("dmId")?.value;
    this.service.Getdm().subscribe(res => {
      let dmdata: any;
      dmdata = res;
      if (dmdata != null) {
        this.invoiceform.get("dmuserName")?.setValue(dmdata.userName);
      }
    });
  }
  customerchange() {
    let customercode = this.invoiceform.get("customerId")?.value;
    this.service.GetCustomer().subscribe(res => {
      let custdata: any;
      custdata = res;
      if (custdata != null) {
        /*this.invoiceform.get("deliveryAddress")?.setValue(custdata.address + ',' + custdata.phoneno + ',' + custdata.email);*/
        this.invoiceform.get("customerName")?.setValue(custdata.name);
      }
    });
  }
  pharmacychange() {
    let pharmacycode = this.invoiceform.get("pharmacyId")?.value;
    this.service.GetPharmacy().subscribe(res => {
      let pharmdata: any;
      pharmdata = res;
      if (pharmdata != null) {
        this.invoiceform.get("deliveryAddress")?.setValue(pharmdata.address + ',' + pharmdata.phoneno + ',' + pharmdata.email);
        this.invoiceform.get("PharmacyName")?.setValue(pharmdata.name);
      }
    });
  }
  addresschange() {
    let addresscodecode = this.invoiceform.get("addressID")?.value;
    this.service.GetAddress().subscribe(res => {
      let addressdata: any;
      addressdata = res;
      if (addressdata != null) {
        this.invoiceform.get("deliveryAddress")?.setValue(addressdata.address + ',' + addressdata.phoneno + ',' + addressdata.email);
        this.invoiceform.get("PharmacyName")?.setValue(addressdata.name);
      }
    });
  }

  productchange(index: any) {
    this.invoicedetail = this.invoiceform.get("details") as FormArray;
    this.invoiceproduct = this.invoicedetail.at(index) as FormGroup;
    let productcode = this.invoiceproduct.get("productCode")?.value;
    this.service.GetProductbycode(productcode).subscribe(res => {
      let proddata: any;
      proddata = res;
      if (proddata != null) {
        console.log(proddata.price);
        console.log(this.invoiceproduct);
        this.invoiceproduct.get("salesPrice")?.setValue(proddata.price);
        this.invoiceproduct.get("productName")?.setValue(proddata.name);
        this.Itemcalculation(index);
      }
    });
  }

  Itemcalculation(index: any) {
    this.invoicedetail = this.invoiceform.get("details") as FormArray;
    this.invoiceproduct = this.invoicedetail.at(index) as FormGroup;
    let qty = this.invoiceproduct.get("qty")?.value;
    let price = this.invoiceproduct.get("salesPrice")?.value;
    console.log(qty);
    console.log(price);
    let total = qty * price;
    this.invoiceproduct.get("total")?.setValue(total);

    this.summarycalculation();
  }
  Removeproduct(index: any) {
    if (confirm('Do you want to remove?')) {
      this.invproducts.removeAt(index);
      this.summarycalculation();

    }
  }

  summarycalculation() {
    let array = this.invoiceform.getRawValue().details;
    let sumtotal = 0
    array.forEach((x: any) => {
      sumtotal = sumtotal + x.total;
    });
    let sumtax = (7 / 100) * sumtotal;
    let nettotal = sumtotal + sumtax;
    this.invoiceform.get("total")?.setValue(sumtotal);
    this.invoiceform.get("tax")?.setValue(sumtax);
    this.invoiceform.get("netTotal")?.setValue(nettotal);
  }

}
