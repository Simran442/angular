import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { HomeService } from './../services/home.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  registerFormId: FormGroup;
  submitted: any;
  message: any;
  constructor(public http: Http, private HomeService: HomeService, private route: Router, private formBuilder: FormBuilder, private spinner: Ng4LoadingSpinnerService) { }

  ngOnInit() {


    this.registerFormId = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]

    });
  }
  get f() { return this.registerFormId.controls; }


  /************************************************************************** */
  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerFormId.invalid) {
      return;
    }

    this.spinner.show()
    this.HomeService.register(this.registerFormId.value.email).subscribe((response) => {

      if (response) {
        this.spinner.hide();
        $("div.thanku").fadeIn()
        setTimeout(function () {
          $("div.thanku").fadeOut(400);
        }, 5000);
      }
      this.spinner.hide();

    }, error => {
      error = JSON.parse(error._body);
      this.message = error.message
      $("div.check").fadeIn()
      setTimeout(function () {
        $("div.check").fadeOut(500);
      }, 5000);


    });
    this.spinner.hide();

  }

  /**********************************************************************************8 */
  getbred(item) {


    if (item == "") {
      $('.li1').hide();
    }
    else {
      $('.li1').show();
    }

    localStorage.setItem('bred', item);

    setTimeout(function () {
      if (localStorage.getItem('bred') == "") {

      }
      else {
        $('.li1').show();
      }


      $('#bread').html(localStorage.getItem('bred'));
    }, 1000);


  }

  /******************************************************************************8 */
  checkbox(items, event, title) {
    $('html, body').animate({
      scrollTop: $("#product-pro").offset().top
    }, 1000);

    $("input:not(#" + items + ")").prop("checked", false);

    $('#' + items).prop("checked", true);


    var target = event.target || event.srcElement || event.currentTarget;

    $('.re_sidebar').removeClass("active");

    $(target).addClass("active");

    if (title == "") {
      $('.li1').hide();
    }
    else {
      $('.li1').show();
    }

    localStorage.setItem('bred', title);

    setTimeout(function () {
      if (localStorage.getItem('bred') == "") {

      }
      else {
        $('.li1').show();
      }

      $('#bread').html(localStorage.getItem('bred'));
    }, 1000);

    $('.side-line').removeClass("active");


    $(target).addClass("active");
    localStorage.setItem('bred', title)

  }


  /*******************************************************************************8 */
  onChecked(e: Event, item) {
    $('html, body').animate({
      scrollTop: $("#product-pro").offset().top
    }, 1000);
    const checkbox = e.target as HTMLInputElement;

    if (!checkbox.checked) {
      $('.re_sidebar').removeClass("active");
      this.route.navigate(['eyes/81913905201']);
    } else {

      this.route.navigate(['eyes/' + item + '']);
      $("#" + item + ".re_sidebar").addClass("active");

    }
  }

}

/************************************************************************************8 */