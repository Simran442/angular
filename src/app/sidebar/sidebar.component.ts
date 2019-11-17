import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HomeService } from './../services/home.service';
import { Http } from '@angular/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FlashMessagesService } from 'angular2-flash-messages';
import { routerNgProbeToken } from '@angular/router/src/router_module';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  category: any;
  marked: any;
  constructor(public http: Http, private HomeService: HomeService, private route: Router, private spinner: Ng4LoadingSpinnerService, private _flashMessagesService: FlashMessagesService) {


  }

  ngOnInit() {
    this.allcategory()
  }

  /****************************************************************************** */

  allcategory() {
    this.spinner.show();

    this.HomeService.allcategory().subscribe((response) => {
      this.category = response.custom_collections;
      this.spinner.hide();
    });

  }


  /********************************************************************************* */
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


  /********************************************************************************** */
  onChecked(e: Event, item) {
    $('html, body').animate({
      scrollTop: $("#product-pro").offset().top
    }, 1000);
    $("input:not(#" + item + ")").prop("checked", false);
    const checkbox = e.target as HTMLInputElement;

    if (!checkbox.checked) {
      $('.re_sidebar').removeClass("active");
      this.route.navigate(['eyes/81913905201']);
    } else {
      $("#" + item + ".re_sidebar").addClass("active");
      this.route.navigate(['lips/' + item + '']);

    }
  }


  /************************************************************************************* */
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
}

/********************************************************************************** */