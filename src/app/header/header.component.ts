import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HomeService } from './../services/home.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertsService } from '@jaspero/ng-alerts';
declare var $: any;
import ShopifyBuy from 'shopify-buy';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  checkout: any;
  public addtoCartCount: any;
  public addtocart: any;
  getcustomer: any;
  quantity: number = 0;
  constructor(public http: Http, private HomeService: HomeService, private _alert: AlertsService, private route: Router, private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {

    $(document).ready(function () {
      $("#scorll1").click(function () {
        $('html,body').animate({
          scrollTop: $(".main-est-sec").offset().top
        },
          '5000');

      });

      $("#scorll2").click(function () {
        $('html,body').animate({
          scrollTop: $(".founder-sec").offset().top
        },
          '5000');

      });

      $("#scorll3").click(function () {
        $('html,body').animate({
          scrollTop: $(".doctor-sec").offset().top
        },
          '5000');

      });


    });


    this.qunatity()

  }

  /**************************************************************************************88 */

  login() {

    this.route.navigate(['/account/login']);
  }


  /**************************************************************************************** */

  aadtocart() {
    this.route.navigate(['/cart'])

  }

  /********************************************************************8 */

  qunatity() {

    var shopClient = ShopifyBuy.buildClient({
      storefrontAccessToken: '10e55cf8f17988e1fb3a81ade7f5c085',
      domain: '@innerbeautyco.myshopify.com',
    });
    var checkoutId = localStorage.getItem('checkoutID')

    shopClient.checkout.fetch(checkoutId).then((checkout) => {
      // Do something with the checkout
      /*  this.quantity = checkout.lineItems.length; */
      var that = this;
      checkout.lineItems.map(function (res) {
        that.quantity = that.quantity + res.quantity
      })
    });
  }

  /******************************************************************************************8 */
  getbred(item) {
    $('html, body').animate({
      scrollTop: $("#product-pro").offset().top
    }, 1000);


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


  /**************************************************************************************8 */
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

  /************************************************************************************* */
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

  /*********************************************************************************8 */
  searchBar() {

    $('.mobile-header .login').css('display', 'block')
    $('.mobile-header #demo-2').css('display', 'none')
  }
  crossBar() {
    $('.mobile-header .login').css('display', 'none')
    $('.mobile-header #demo-2').css('display', 'block')
  }
}

/******************************************************************************************* */