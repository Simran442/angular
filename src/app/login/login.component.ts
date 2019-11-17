import { HomeService } from './../services/home.service';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
declare var $: any;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewChecked {
  registerFormId: FormGroup;
  submitted = false;
  auth: any;
  status: any;
  constructor(public http: Http, private HomeService: HomeService, private route: Router, private formBuilder: FormBuilder, private spinner: Ng4LoadingSpinnerService
  ) {

  }
  /**********************************************************************************8 */
  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.status = true;

    } else {
      this.status = false;
    }

    this.registerFormId = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    window.scrollTo(0, 0)

  }


  /*****************************************************************************8 */
  ngAfterViewChecked() {
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  }


  get f() { return this.registerFormId.controls; }

  onLogin() {


    this.submitted = true;

    // stop here if form is invalid
    if (this.registerFormId.invalid) {
      return;
    }

    this.auth = localStorage.getItem('email');
    this.HomeService.login(this.registerFormId.value.email, this.registerFormId.value.password).subscribe((response) => {
      if (response.status == 401) {
        $("div.failure").fadeIn(300).delay(1500).fadeOut(400);
      } else if (response.status == 403) {
        $("div.failure").fadeIn(300).delay(1500).fadeOut(400);
      } else {
        $("div.success").fadeIn(300).delay(1500).fadeOut(400);
        localStorage.setItem('email', this.registerFormId.value.email)
        this.route.navigate(['/checkout']);
      }

    });

  }

  /************************************************************************************** */
  Logout() {
    this.spinner.show();
    localStorage.removeItem('email')
    window.location.reload()
    this.spinner.hide();
  }

}


/***********************************************************************************8 */