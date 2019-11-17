import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './../services/home.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute } from '@angular/router';
import ShopifyBuy from 'shopify-buy';
declare var $: any;


@Component({
  selector: 'app-articalblog',
  templateUrl: './articalblog.component.html',
  styleUrls: ['./articalblog.component.css']
})
export class ArticalblogComponent implements OnInit {
  public article: any;
  sub: any;
  id: any;
  count: any = 1;
  variantImages: any;
  hide: any;
  index: any;
  itemsid: any;
  selectedColorDropdown: any;
  productvariant: any;
  ids: any;
  totalcounts: any;
  counts: any;
  activedropdownCSS: any
  addquantity: any;
  activeProductImage: any;
  page: number = 0;
  longdescription: any;
  dataa: any;
  shortdescription: any;
  reviewimages: any;
  productIngrediant: any;
  encodeID: any;
  price: any;
  reviewProduct: any;
  itemsColour: any;
  products: any;
  customOptions: any = {
    loop: true,
    margin: 10,
    responsiveClass: true,
    autoplay: true,
    responsive: {
      0: {
        items: 2,
        nav: true
      },
      600: {
        items: 3,
        nav: true
      },
      1000: {
        items: 3,
        nav: true,
        loop: true
      },
      1200: {
        items: 3,
        nav: true,
        loop: true
      }


    }
  }
  constructor(public http: Http, private HomeService: HomeService, private route: Router, private spinner: Ng4LoadingSpinnerService, private _flashMessagesService: FlashMessagesService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    if (localStorage.getItem('quantity') == null || localStorage.getItem('quantity') == 'NaN' || localStorage.getItem('quantity') < '0')
      localStorage.setItem('quantity', '0');
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = + params['id'];
      this.itemsid = +params['id']; // (+) converts string 'id' to a number
      this.hide = false;
      this.newproducts();
      this.articleBlog(this.id, this.itemsid);
      this.blog();
    });
    window.scrollTo(0, 0)

  }

  /********************************************************************** */
  articleBlog(id, itemid) {
    this.HomeService.articleBlog(id, itemid).subscribe((response) => {
      this.article = response.users.articles;
    });
  }

  /******************************************************************** */
  newproducts() {
    this.spinner.show();
    this.HomeService.plans(this.page).subscribe((response) => {

      var that = this;
      for (this.dataa in response.users.products) {

        if (response.users.products[this.dataa].images[0]) {
          var short = response.users.products[this.dataa].body_html.split("|");
          if (short[1]) {
            response.users.products[this.dataa].shortdescription = short[1].replace(/<[^>]*>/g, '');
          } else {
            response.users.products[this.dataa].shortdescription = "";
          }
          var long = response.users.products[this.dataa].body_html.replace(/<[^>]*>/g, '');
          response.users.products[this.dataa].longdescription = long;
          response.users.products[this.dataa].activeprice = response.users.products[this.dataa].variants[0].price;
          response.users.products[this.dataa].activeVariant = response.users.products[this.dataa].images[0].src;
          that.activeProductImage = response.users.products[this.dataa].images[0].src;
        } else {
          that.activeProductImage = '';
        }

      }
      this.products = response.users.products;
      this.totalcounts = response.count;
      this.counts = response.users.products.length;
      setTimeout(() => {
        that.activeProductImage = '';
      }, 1000);
      this.spinner.hide();
    });
  }

  /********************************************************************** */
  popup(id, item) {
    this.spinner.show();
    (this.activeProductImage == "" ? this.activeProductImage = item.images[0].src : "")
    this.HomeService.productId(id).subscribe((response) => {
      this.reviewProduct = response.users;
      var short = response.users.product.body_html.split("|");
      if (short[1]) {
        this.shortdescription = short[1].replace(/<[^>]*>/g, '');
      } else {
        this.shortdescription = "";
      }
      var long = short[0].replace(/<[^>]*>/g, '');
      this.longdescription = long;
      this.productIngrediant = response.ingrediantsDetails[0];
      this.price = response.users.product.variants[0].price;
      this.reviewimages = this.reviewProduct.id;
      this.spinner.hide();
      (this.itemsColour == undefined || this.itemsColour == "" ? setTimeout(function () {
        $(".circle-sec .fa.fa-circle:eq(0)").click();
        $("#popup").modal({
          backdrop: 'static',
          keyboard: false
        })
      }, 50) : $("#popup").modal({
        backdrop: 'static',
        keyboard: false
      }, 50))

    });

  }
  /**************************************************************************** */
  closePopup() {
    this.variantImages = [];
    this.activeProductImage = "";
    this.selectedColorDropdown = "";
    this.itemsColour = "";
  }


  /************************************************************************** */
  blog() {
    this.HomeService.Blogs().subscribe((response) => {
      this.article = response.users.articles;

    });
  }

  /************************************************************************ */

  onMouseMove(item, id, event, product) {
    this.productvariant = product;
    this.itemsColour = item;


    var target = event.target || event.srcElement || event.currentTarget;



    var then = this;
    this.products.map(function (res) {
      res.variants.map(function (img) {

        if (img.id == id) {

          if (img.price) {
            then.price = img.price;
          } else {
            then.price = "0";
          }
          res.images.map(function (imgSrc) {
            if (imgSrc.id === img.image_id) {
              $("img").removeClass('active');
              $('#' + imgSrc.id).addClass('active');
              then.activeProductImage = imgSrc.src;
              then.selectedColorDropdown = imgSrc.variant_ids[0];
              then.itemsColour = item;
            }
          })
        }
      })
    })


    var index = this.reviewProduct.product.images.map(function (el) {
      return el.id;
    }).indexOf(this.productvariant.image_id);

    this.index = index;

    var i = this.index;
    for (i = this.index; i <= this.reviewProduct.product.images.length; i++) {
      if (this.reviewProduct.product.images[i].id == this.productvariant.image_id) {
        this.variantImages = [];

        this.variantImages.push({ src: this.reviewProduct.product.images[i].src })
      } else {
        if (this.reviewProduct.product.images[i].variant_ids.length == 0) {
          this.variantImages.push({ src: this.reviewProduct.product.images[i].src });
        } else {
          break;
        }
      }
    }

  }
  /************************************************************************* */
  changeActiveProductImage(image) {

    if ($('img').hasClass('active'))
      $('img').removeClass('active');

    $(".ng-star-inserted").click(function (event) {
      var target = $(event.target);
      if (target.is("img"))
        target.addClass('active');
    });

    if (image.src) {
      this.activeProductImage = image.src;
    } else {
      this.activeProductImage = "../assets/images/NoImageFound.png";
    }
  }

  /****************************************************************************8 */

  selectshades(item, id, event, product) {
    if (item == "color") {
      if (product == 'variantId') {
        this.reviewProduct.product.variants.forEach((response) => {
          if (response.id == id) {
            this.productvariant = response;
          }
        })
      }

      var item = event.target.options[event.target.options.selectedIndex].text;
      this.itemsColour = item;
    } else {
      this.productvariant = product;
      this.itemsColour = item;
    }

    var target = event.target || event.srcElement || event.currentTarget;
    $(".shade-common, .shade-common i").removeClass("active");

    $(target).addClass("active");


    if ($(".circle-sec .shade-common i").hasClass(item)) {

    }

    var then = this;
    this.products.map(function (res) {
      res.variants.map(function (img) {

        if (img.id == id) {

          if (img.price) {
            then.price = img.price;
          } else {
            then.price = "0";
          }
          res.images.map(function (imgSrc) {
            if (imgSrc.id === img.image_id) {
              $("img").removeClass('active');
              $('#' + imgSrc.id).addClass('active');
              then.activeProductImage = imgSrc.src;
              then.selectedColorDropdown = imgSrc.variant_ids[0];
              then.itemsColour = item;
            }
          })
        }
      })
    })

    $("#shedes option").removeAttr('selected');
    $("#shedes option:contains(" + item + ")").prop('selected', 'selected');
    var index = this.reviewProduct.product.images.map(function (el) {
      return el.id;
    }).indexOf(this.productvariant.image_id);

    this.index = index;

    var i = this.index;
    for (i = this.index; i <= this.reviewProduct.product.images.length; i++) {
      if (this.reviewProduct.product.images[i].id == this.productvariant.image_id) {
        this.variantImages = [];

        this.variantImages.push({ src: this.reviewProduct.product.images[i].src })
      } else {
        if (this.reviewProduct.product.images[i].variant_ids.length == 0) {
          this.variantImages.push({ src: this.reviewProduct.product.images[i].src });
        } else {
          break;
        }
      }
    }
  }

  /************************************************************************************8 */
  add() {
    this.count++;
  }

  /********************************************************************************** */
  subs() {
    if (this.count <= 0) {
      this.count = 0
    } else {
      this.count--;
    }

  }

  /*************************************************************************************8 */
  addtocart(productvariant) {
    var quantity = parseInt($(".qty").val());
    var storage = localStorage.getItem('quantity') ? localStorage.getItem('quantity') : '';
    if (this.itemsColour == undefined || this.itemsColour == "select a shade" || this.itemsColour == "") {
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
              $("#popup").modal('hide');
            }, 500);


            var that = this;
            setTimeout(function () {
              that.activeProductImage = "";
              that.selectedColorDropdown = "";
              that.activedropdownCSS = "";
              that.variantImages = [];

            }, 1000);
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
                $("#popup").modal('hide');
              }, 500);

              var that = this;
              setTimeout(function () {
                that.activeProductImage = "";
                that.selectedColorDropdown = "";
                that.activedropdownCSS = "";
                that.variantImages = [];

              }, 1000);

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

  /***********************************************************************************8 */

  selectshadess(item, id, color, event, items) {
    var then = this;
    this.products.map(function (res) {

      res.variants.map(function (img) {
        if (img.id == id) {
          then.productvariant = img;
          items.activeprice = img.price
          res.images.map(function (imgSrc) {


            if (imgSrc.id === img.image_id) {
              items.activeVariant = imgSrc.src;
              then.activeProductImage = imgSrc.src;
              then.selectedColorDropdown = imgSrc.variant_ids[0];
              then.itemsColour = color;
            }
          })
        }
      })


    })
    var index = items.images.map(function (el) {
      return el.id;
    }).indexOf(then.productvariant.image_id);


    this.index = index;

    var i = this.index;
    for (i; i <= items.images.length; i++) {
      if (items.images[i].id == this.productvariant.image_id) {
        this.variantImages = [];

        this.variantImages.push({ src: items.images[i].src })
      } else {
        if (items.images[i].variant_ids.length == 0) {
          this.variantImages.push({ src: items.images[i].src });
        } else {
          break;
        }

      }
    }
  }

}
/*************************************************************************************** */