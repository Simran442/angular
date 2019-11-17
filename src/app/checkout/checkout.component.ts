import { Component, OnInit } from '@angular/core';
import Client from 'shopify-buy';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  public checkout: any;

  constructor(private formBuilder: FormBuilder, private spinner: Ng4LoadingSpinnerService, private route: Router) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({

      First_name: ['', [Validators.required]],
      Last_name: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pin_code: ['', [Validators.required]]


    });
    this.checkoutId();
    window.scrollTo(0, 0)
  }

  /*************************************************************************************8 */

  checkoutId() {
    if (localStorage.getItem('email')) {
      this.spinner.show();
      var shopClient = Client.buildClient({
        storefrontAccessToken: '10e55cf8f17988e1fb3a81ade7f5c085',
        domain: '@innerbeautyco.myshopify.com',
      });

      const checkoutId = localStorage.getItem('checkoutID');
      shopClient.checkout.fetch(checkoutId).then((checkout) => {

        this.checkout = checkout;
        this.spinner.hide();
      });


    } else {
      this.route.navigate(['/account/login']);
    }
  }


  get f() { return this.registerForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

  }

}

/***********************************************************************************8 */