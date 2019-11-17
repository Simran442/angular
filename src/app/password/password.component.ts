import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../services/home.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $: any;

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  sub: any;
  id: any;
  registerFormId: FormGroup;
  submitted = false;
  hide: any;
  customerid: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private HomeService: HomeService,
    private spinner: Ng4LoadingSpinnerService,

  ) {

    this.registerFormId = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required]
    });


  }

  /************************************************************************** */
  ngOnInit() {

    $(function () {
      $("#passwordForm").validate({
        errorElement: 'li',
        onclick: true,
        rules: {
          ConfirmPassword: {
            equalTo: "#password"
          }
        },

        messages: {
          ConfirmPassword: {
            equalTo: "password and confirm password doesn't match"
          }
        },


        submitHandler: function (form) {
          form.submit();
        }
      })
    })
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.hide = false;
      this.customerid = this.id;
    });

  }
  /***********************************************************************8 */

  get g() { return this.registerFormId.controls; }

  onLogin() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerFormId.invalid) {
      return;
    }

    this.HomeService.password(this.customerid, this.registerFormId.value.password).subscribe((response) => {
      this.spinner.show()

      if (response.status == 200) {
        this.router.navigate(['/account/login']);
      }

      this.spinner.hide();
    });
  }
}

/***************************************************************************88 */