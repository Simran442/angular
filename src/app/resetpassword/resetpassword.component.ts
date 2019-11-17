import { Component, OnInit } from '@angular/core';
import { HomeService } from './../services/home.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
declare var $: any;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  registerFormId: FormGroup;
  submitted = false;
  constructor(public http: Http, private HomeService: HomeService, private route: Router, private formBuilder: FormBuilder, private spinner: Ng4LoadingSpinnerService) { }

  ngOnInit() {

    this.registerFormId = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]

    });
  }

  get f() { return this.registerFormId.controls; }

  /**************************************************************************** */
  onLogin() {


    this.submitted = true;

    // stop here if form is invalid
    if (this.registerFormId.invalid) {
      return;
    }

    this.HomeService.resetpassword(this.registerFormId.value.email).subscribe((response) => {

      if (response.message == 'customer does not exsist') {
        $("div.failure").fadeIn(300).delay(1500).fadeOut(400);
      } else {
        $("div.success").fadeIn(300).delay(1500).fadeOut(400);
      }

    });
  }
}

/****************************************************************************** */