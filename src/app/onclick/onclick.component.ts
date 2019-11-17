import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HomeService } from './../services/home.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import ShopifyBuy from 'shopify-buy';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

declare var $: any;
declare var window: any;

@Component({
  selector: 'app-onclick',
  templateUrl: './onclick.component.html',
  styleUrls: ['./onclick.component.css']
})
export class OnclickComponent implements OnInit, AfterViewInit {
  isLoading: boolean = true;
  public api_url: any;
  itemsColour: any;
  productvariant: any;
  ratingSize: any;
  products: any;
  selectedColorDropdown: any;
  productImageId: any
  showSlides: any;
  totalrating: number = 0;
  index: any;
  RatingAverage: any;
  productIngrediant: any;
  ids: any;
  unique: {};
  /*   variantImages = [] */
  variantImages: any = [];

  ratingReview: any;
  ColorName: any;
  sub: any;
  count: number = 1;
  variantCount: number = 1;
  id: any;
  currentDate: any;
  hide: any;
  shade: string;
  quantity: any;
  price: any;
  InstaMedia: any;
  addtoCartCount: any;
  convertDate: any;
  checkout: any;
  addquantity: any;
  lineItemsToAdd: any;
  checkoutArray: any;
  encodeID: any;
  activeProductImage: any; mouseout
  clientid: any;
  longdescription: any;
  shortdescription: any;
  checkoutsID: any;
  bred: any;
  customOptions: any = {
    loop: false,
    autoplay: false,
    navSpeed: 700,
    dots: false,
    navText: [
      "<img class='left-part' src='../assets/images/left-arrow.png'>", "<img class='right-part' src='../assets/images/right-arrow.png'>"
    ],

    responsive: {
      0: {
        items: 4,
        nav: true
      },
      600: {
        items: 4,
        nav: true
      },
      1000: {
        items: 4,
        nav: true,
        loop: true
      },
      1200: {
        items: 4,
        nav: true,
        loop: true
      }


    }
  }
  images: any = {
    loop: false,
    autoplay: false,
    navSpeed: 700,
    dots: true,
    navText: [
      "<img class='left-part' src='../assets/images/left-arrow.png'>", "<img class='right-part' src='../assets/images/right-arrow.png'>"
    ],

    responsive: {
      0: {
        items: 2,
        nav: true
      },
      768: {
        items: 3,
        nav: true
      },
      1000: {
        items: 4,
        nav: true,
        loop: true
      },
      1200: {
        items: 4,
        nav: true,
        loop: true
      }


    }
  }

  constructor(public http: Http, private HomeService: HomeService, private router: Router, private activatedRoute: ActivatedRoute, private _flashMessagesService: FlashMessagesService, private spinner: Ng4LoadingSpinnerService) {

  }


  ngOnInit() {


    $('.close').click(function () {
      $('.embed-responsive').css('display', 'none');
    });
    this.bred = localStorage.getItem('bred')
    $('.li1').show();
    $(".parent-container-dropdown a").addClass("active");
    this.sub = this.activatedRoute.params.subscribe(params => {

      this.id = + params['id']; // (+) converts string 'id' to a number
      this.hide = false;

      this.productsID(this.id);

      this.reviewRating(this.id);
      this.InstagramMedia();
    });
    window.scrollTo(0, 0)
  }


  /******************************************************************************8 */
  ngAfterViewInit() {
    $('#pic-0 img')
      .wrap('<span style="display:inline-block"></span>')
      .css('display', 'block')
      .parent()
      .zoom();
    $(".shade-common i:eq(0)").click();
    $(".shade-common i:eq(0)").css("background-color", $(".shade-common i:eq(0)").attr("initialColor"));
  }


  /*********************************************************************************** */

  InstagramMedia() {
    this.HomeService.MediaInstagram().subscribe((response) => {
      this.InstaMedia = response

    })
  }


  /******************************************************************************8 */
  add() {
    this.count++;
  }

  /**************************************************************************** */

  subs() {
    if (this.count <= 0) {
      this.count = 0
    } else {
      this.count--;
    }

  }


  /**************************************************************************** */
  productsID(id) {


    if (localStorage.getItem('bred')) {
      $('.li1').show();
    }
    else {
      $('.li1').hide();
    }
    this.spinner.show();
    this.HomeService.productId(id).subscribe((response) => {
      this.productvariant = response.users.product.variants[0];
      this.productIngrediant = response.ingrediantsDetails[0];
      this.itemsColour = response.users.product.variants[0].option2;
      this.selectedColorDropdown = response.users.product.variants[0].id;
      this.price = response.users.product.variants[0].price;
      this.products = response.users.product;

      var short = this.products.body_html.split("|");
      if (short[1]) {
        this.shortdescription = short[1].replace(/<[^>]*>/g, '');
      } else {
        this.shortdescription = "";
      }

      var long = short[0].replace(/<[^>]*>/g, '');
      this.longdescription = long;
      if (this.products.images[0]) {
        this.activeProductImage = this.products.images[0].src;
      } else {
        this.activeProductImage = "";
      }
      setTimeout(function () {
        $(".circle-sec .fa.fa-circle:eq(0)").click();
        $("#popup").modal({
          backdrop: 'static',
          keyboard: false
        })
      }, 20)
      this.spinner.hide();
      this.isLoading = false;
    });

  }


  /******************************************************************************* */
  reviewRating(id) {
    this.HomeService.reviewrating(id).subscribe((response) => {

      response.review.forEach(element => {
        if (element.rating == undefined) {

        }
        var ratingNumber = parseInt(element.rating);

        this.totalrating = this.totalrating + ratingNumber;

      });
      if (response.review.length == 0) {
        this.RatingAverage = 0;
        this.ratingSize = response.review.length;
      } else {
        this.ratingSize = response.review.length;
        var a = this.ratingSize * 5;
        this.RatingAverage = this.totalrating / a * 5;
        this.ratingReview = response.review;
      }
      this.currentDate = new Date(this.ratingReview.created_at);
      this.convertDate = this.currentDate.getFullYear() + "-" + ((this.currentDate.getMonth() + 1) <= 9 ? '0' + (this.currentDate.getMonth() + 1) : (this.currentDate.getMonth() + 1)) + "-" + (this.currentDate.getDate() <= 9 ? '0' + this.currentDate.getDate() : this.currentDate.getDate())
    })

  }

  /******************************************************************************8 */
  selectshades(item, id, event, product) {

    if (item == "color") {
      if (product == 'variantId') {
        this.products.variants.forEach((response) => {
          if (response.id == id) {
            this.productvariant = response;
          }
        })
      }

      var colorName = event.target.options[event.target.options.selectedIndex].text;
      this.itemsColour = colorName
      if (this.itemsColour == 'select a shade') {
        this.activeProductImage = this.products.images[0].src;
      }
      var target = event.target || event.srcElement || event.currentTarget;
      $(".shade-common, .shade-common i").removeClass("active");
      $(target).addClass("active");
      var that = this;
      this.products.variants.map(function (variant) {
        if (variant.id == id) {
          if (variant.price) {
            that.price = variant.price;
          } else {
            that.price = 0;
          }
          variant.image_id;
          var those = that;
          that.products.images.map(function (images) {
            if (images.id == variant.image_id) {
              $("img").removeClass('active');
              $('#' + images.id).addClass('active');

              those.activeProductImage = images.src;
              $("#pic-0").append($("#pic-0 img:eq(0)"));
              $("#pic-0 span").remove();
              $("#pic-0").hide();
              setTimeout(function () {
                $('#pic-0 img')
                  .wrap('<span style="display:inline-block"></span>')
                  .css('display', 'block')
                  .parent()
                  .zoom();
                $("#pic-0").show(200);
              }, 10);
            }

          })

        }
      });

      $("#shedes option").removeAttr('selected');
      $("#shedes option:contains(" + item + ")").prop('selected', 'selected');
      $(".shade-common [initialcolor=" + colorName + "]").click();
      var index = this.products.images.map(function (el) {
        return el.id;
      }).indexOf(this.productvariant.image_id);

      this.index = index;

      var i = this.index;
      for (i = this.index; i <= this.products.images.length; i++) {
        if (this.products.images[i].id == this.productvariant.image_id) {
          this.variantImages = [];

          this.variantImages.push({ src: this.products.images[i].src })
        } else {
          if (this.products.images[i].variant_ids.length == 0) {
            this.variantImages.push({ src: this.products.images[i].src });
          } else {
            break;
          }

        }
      }
    } else {
      this.productvariant = product;


      this.itemsColour = item

      var target = event.target || event.srcElement || event.currentTarget;
      $(".shade-common, .shade-common i").removeClass("active");
      $(".shade-common").css("background-color", $(this).attr("initialColor"));
      $('.shade-common i:not(.active)').css('background-color', '');
      $(target).addClass("active");

      if ($(".circle-sec .shade-common i").hasClass(item)) {
        $(".circle-sec .shade-common ." + item + "").addClass('active').css("background-color", item);
      }
      else {
        /* $(target).css("background-color", item); */
      }

      var that = this;
      this.products.variants.map(function (variant) {
        if (variant.id == id) {
          if (variant.price) {
            that.price = variant.price;
          } else {
            that.price = 0;
          }
          variant.image_id;
          var those = that;
          that.products.images.map(function (images) {
            if (images.id == variant.image_id) {

              $("img").removeClass('active');
              $('#' + images.id).addClass('active');

              those.activeProductImage = images.src
              $("#pic-0").append($("#pic-0 img:eq(0)"));
              $("#pic-0 span").remove();
              $("#pic-0").hide();
              setTimeout(function () {
                $('#pic-0 img')
                  .wrap('<span style="display:inline-block"></span>')
                  .css('display', 'block')
                  .parent()
                  .zoom();
                $("#pic-0").show(200);
              }, 10);
            }

          })

        }
      });

      $("#shedes option").removeAttr('selected');
      $("#shedes option:contains(" + item + ")").prop('selected', 'selected');
    }
    $(".shade-common i.active").css("background-color", $(".shade-common i.active").attr("initialColor"));
    $('.shade-common i:not(.active)').css('background-color', '');
    var index = this.products.images.map(function (el) {
      return el.id;
    }).indexOf(this.productvariant.image_id);

    this.index = index;

    var i = this.index;
    for (i = this.index; i <= this.products.images.length; i++) {
      if (this.products.images[i].id == this.productvariant.image_id) {
        this.variantImages = [];

        this.variantImages.push({ src: this.products.images[i].src })
      } else {
        if (this.products.images[i].variant_ids.length == 0) {
          this.variantImages.push({ src: this.products.images[i].src });
        } else {
          break;
        }

      }
    }

  }
  /******************************************************************************************8 */

  addtocart(productvariant) {
    var quantity = parseInt($(".qty").val());

    var storage = localStorage.getItem('quantity') ? localStorage.getItem('quantity') : '';
    if (this.itemsColour == undefined || this.itemsColour == "select a shade") {
      $("div.warning").fadeIn(300).delay(1500).fadeOut(400);
    } else {
      this.ids = quantity;
      if (this.ids > productvariant.inventory_quantity) {
        $("div.failure").fadeIn(300)
        setTimeout(function () {
          $("div.failure").fadeOut(400);
        }, 5000);

      } else {

        var shopClient = ShopifyBuy.buildClient({
          storefrontAccessToken: '10e55cf8f17988e1fb3a81ade7f5c085',
          domain: '@innerbeautyco.myshopify.com',
        });

        this.encodeID = btoa(productvariant.admin_graphql_api_id);

        var lineItemsToAdd = [
          { variantId: this.encodeID, quantity: this.ids }
        ];

        if (localStorage.getItem('checkoutID')) {
          shopClient.checkout.addLineItems(localStorage.getItem('checkoutID'), lineItemsToAdd).then((checkout) => {
            // Do something with the updated checkout
            $("div.success").fadeIn()
            setTimeout(function () {
              $("div.success").fadeOut(400);
            }, 5000);
            setTimeout(function () {
              $("#popup").modal('hide');
            }, 1500);
            var notificationQuantity = parseInt(storage);
            var amount = Number(quantity);
            notificationQuantity = notificationQuantity + amount;
            localStorage.setItem('quantity', notificationQuantity.toString());

            $(".countity span").text(notificationQuantity);
            this.spinner.hide();
          });
        } else {

          shopClient.checkout.create().then((checkout) => {
            var checkoutID = checkout.id;
            localStorage.setItem('checkoutID', checkout.id)

            // Add an item to the checkout
            shopClient.checkout.addLineItems(checkoutID, lineItemsToAdd).then((checkout) => {
              // Do something with the updated checkout
              $("div.success").fadeIn()
              setTimeout(function () {
                $("div.success").fadeOut(400);
              }, 5000);

              setTimeout(function () {
                $("#popup").modal('hide');
              }, 1500);
              var notificationQuantity = parseInt(storage);
              var amount = Number(quantity);
              notificationQuantity = notificationQuantity + amount;
              localStorage.setItem('quantity', notificationQuantity.toString());
              $(".countity span").text(notificationQuantity);
              this.addquantity = checkout.lineItems.length;
              this.spinner.hide()
            });
          });

        }
      }
    }
  }

  /*************************************************************************************** */
  changeActiveProductImage(image) {
    $("img").removeClass('active');
    if ($('img').hasClass('mg'))
      $('img').removeClass('mg');

    $(".ng-star-inserted").click(function (event) {
      var target = $(event.target);
      if (target.is("img"))
        target.addClass('mg');
    });

    if (image) {
      this.activeProductImage = image;
      $("#pic-0").append($("#pic-0 img:eq(0)"));
      $("#pic-0 span").remove();
      $("#pic-0").hide();
      setTimeout(function () {
        $('#pic-0 img')
          .wrap('<span style="display:inline-block"></span>')
          .css('display', 'block')
          .parent()
          .zoom();
        $("#pic-0").show(200);
      }, 10);


    } else {
      this.activeProductImage = "../assets/images/NoImageFound.png";
    }
  }

  /*************************************************************************************8 */

  onMouseMove(item, id, event, product) {
    var that = this;
    this.products.variants.map(function (variant) {
      if (variant.id == id) {
        if (variant.price) {
          that.price = variant.price;
        } else {
          that.price = 0;
        }
        variant.image_id;
        var those = that;
        that.products.images.map(function (images) {
          if (images.id == variant.image_id) {
            $("img").removeClass('active');
            $('#' + images.id).addClass('active');

            those.activeProductImage = images.src;
            $("#pic-0").append($("#pic-0 img:eq(0)"));
            $("#pic-0 span").remove();
            $("#pic-0").hide();
            setTimeout(function () {
              $('#pic-0 img')
                .wrap('<span style="display:inline-block"></span>')
                .css('display', 'block')
                .parent()
                .zoom();
              $("#pic-0").show(200);
            }, 10);
          }

        })

      }
    });
    this.productvariant = product;

    var index = this.products.images.map(function (el) {
      return el.id;
    }).indexOf(this.productvariant.image_id);

    this.index = index;

    var i = this.index;
    for (i = this.index; i <= this.products.images.length; i++) {
      if (this.products.images[i].id == this.productvariant.image_id) {
        this.variantImages = [];

        this.variantImages.push({ src: this.products.images[i].src })
      } else {
        if (this.products.images[i].variant_ids.length == 0) {
          this.variantImages.push({ src: this.products.images[i].src });
        } else {
          break;
        }

      }
    }

  }

  /********************************************************************************8 */



  videoplay() {
    $('.embed-responsive').css('display', 'block');
  }


  videopopup() {
    /* 
        $('.embed-responsive-item').each(function (index) {
          $(this).attr('src', $(this).attr('src'));
          return false;
        }); */
    $('.embed-responsive').css('display', 'none');
    $("#headerPopup").get(0).pause();
  }
}




/***************************************************************************************8 */