import { HomeService } from './../services/home.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import ShopifyBuy from 'shopify-buy';
declare var $: any;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerFormId: any;
  loading = false;
  submitted = false;
  constructor(public http: Http, private HomeService: HomeService, private route: Router, private formBuilder: FormBuilder, private spinner: Ng4LoadingSpinnerService
  ) {

  }
/********************************************************************************* */
  ngOnInit() {
    this.registerFormId = this.formBuilder.group({
      Username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]

    });
  }


  /***************************************************************************************8 */
  get f() { return this.registerFormId.controls; }

  onSubmit() {
    
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerFormId.invalid) {
      return;
    }
    this.spinner.show();
    this.HomeService.signup(this.registerFormId.value).subscribe((response) => {
      if (response) {
        $("#Thanku").modal('show');
        setTimeout(function () {
          $("#Thanku").modal('hide');
        }, 5000);
        // this.route.navigate(['/account/login']);
      }

    }, error => {
      error = JSON.parse(error._body);
      if (error.data.email) {
        $("div.failure").text(error.data.email).fadeIn(300).delay(1500).fadeOut(400);
      } else {
        $("div.failure").text('phone ' + error.data.phone).fadeIn(300).delay(1500).fadeOut(400);
      }

      this.spinner.hide()
    });
  }
}
/************************************************************************************8 */