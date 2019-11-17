import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './../services/home.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FlashMessagesService } from 'angular2-flash-messages';
declare var $: any;


@Component({
  selector: 'app-blogpage',
  templateUrl: './blogpage.component.html',
  styleUrls: ['./blogpage.component.css']
})
export class BlogpageComponent implements OnInit {

  public article: any
  constructor(public http: Http, private HomeService: HomeService, private route: Router, private spinner: Ng4LoadingSpinnerService, private _flashMessagesService: FlashMessagesService) {

  }

  ngOnInit() {
    this.articleBlog()
  }

  /************************************************************************************8 */
  articleBlog() {
    this.spinner.show();
    this.HomeService.Blogs().subscribe((response) => {
      this.article = response.users.articles;
      this.spinner.hide()
    });
  }

}
/**************************************************************************************8 */