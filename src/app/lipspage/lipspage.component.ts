import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HomeService } from './../services/home.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $: any;
import ShopifyBuy from 'shopify-buy';

@Component({
  selector: 'app-lipspage',
  templateUrl: './lipspage.component.html',
  styleUrls: ['./lipspage.component.css']
})
export class LipspageComponent implements OnInit {

  public api_url: any;
  price: any;
  itemsColour: any;
  newdate: any;
  productvariant: any;
  products: any;
  selectedColorDropdown: any;
  subs: any;
  activedropdownCSS: any;
  productIngrediant: any
  convertDate: any;
  shortdescription: any;
  event: any;
  index: any
  id: any;
  variantImages: any;
  New: any;
  dataa: any;
  longdescription: any;
  data: any;
  addquantity: any;
  ids: any;
  convertDate1: any;
  hide: any;
  currentDate: any;
  activeProductImage: any;
  counts: any;
  diffDays: any;
  totalcounts: any
  diffTime: any
  category: any;
  encodeID: any;
  description: any;
  reviewProduct: any;
  reviewimages: any;
  lipcontent: any;
  count: number = 1;
  bred: any;
  constructor(public http: Http, private HomeService: HomeService, private route: Router, private activatedRoute: ActivatedRoute, private spinner: Ng4LoadingSpinnerService) {

  }

  ngOnInit() {
    var val = localStorage.getItem('quantity');
    if (localStorage.getItem('quantity') == null || localStorage.getItem('quantity') == 'NaN' || localStorage.getItem('quantity') < '0')
      localStorage.setItem('quantity', '0');
    this.bred = localStorage.getItem('bred') ? localStorage.getItem('bred') : '';
    $(".parent-container-dropdown a").addClass("active");
    this.subs = this.activatedRoute.params.subscribe(params => {
      this.id = + params['id']; // (+) converts string 'id' to a number

      this.newproducts(this.id);
      this.allcategory();
      this.lipscontent();
    });

    $('#' + this.id).prop("checked", true);

  }


  /********************************************************************************************8 */
  addtocart(productvariant) {
    var quantity = parseInt($(".qty").val());
    var storage = localStorage.getItem('quantity') ? localStorage.getItem('quantity') : '';
    if (this.itemsColour == undefined || this.itemsColour == "select a shade" || this.itemsColour == "") {
      $("div.warning").fadeIn(300).delay(1500).fadeOut(400);
    } else {
      this.ids = (quantity);
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
              that.itemsColour = "";
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
                that.itemsColour = "";
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
  closePopup() {
    this.variantImages = [];
    this.activeProductImage = "";
    this.selectedColorDropdown = "";
    this.itemsColour = "";
  }


  /**********************************************************************************8 */
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

  /****************************************************************************************** */

  newproducts(id) {
    this.spinner.show();
    this.event = new Date();

    this.currentDate = new Date(this.event);
    this.convertDate = this.currentDate.getFullYear() + "-" + ((this.currentDate.getMonth() + 1) <= 9 ? '0' + (this.currentDate.getMonth() + 1) : (this.currentDate.getMonth() + 1)) + "-" + (this.currentDate.getDate() <= 9 ? '0' + this.currentDate.getDate() : this.currentDate.getDate())
    this.HomeService.LipsID(id).subscribe((response) => {


      var that = this;

      for (this.dataa in response.users.products) {

        this.newdate = response.users.products[this.dataa].created_at;

        var createDate = new Date(this.newdate);
        this.convertDate1 = createDate.getFullYear() + "-" + ((createDate.getMonth() + 1) <= 9 ? '0' + (createDate.getMonth() + 1) : (createDate.getMonth() + 1)) + "-" + (this.currentDate.getDate() <= 9 ? '0' + createDate.getDate() : createDate.getDate())

        const date1 = new Date(this.convertDate1);
        const date2 = new Date(this.convertDate);
        this.diffTime = Math.abs(date1.getTime() - date2.getTime());
        this.diffDays = Math.ceil(this.diffTime / (1000 * 60 * 60 * 24));
        this.diffDays >= 30 ? this.New = "" : this.New = "NEW";
        response.users.products[this.dataa].new = this.New;

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

      if (response.users.products.length == 0) {
        $("div.noProduct").fadeIn(300)
        setTimeout(function () {
          $("div.noProduct").fadeOut(400);
        }, 5000);
      }

      this.products = response.users.products;
      setTimeout(() => {
        that.activeProductImage = '';
      }, 1000);

    });

  }


  /*********************************************************************************** */
  allcategory() {
    this.HomeService.allcategory().subscribe((response) => {

      this.category = response.custom_collections;

    });
  }


  /************************************************************************************* */
  lipscontent() {
    this.HomeService.lipcontent().subscribe((response) => {
      this.lipcontent = response.users.page
      var myContent = response.users.page.body_html;

      this.description = $(myContent).text();
    });
  }


  /*********************************************************************************8 */
  clear() {

    localStorage.setItem('bred', '')

    $('.li1').hide();
  }

  /********************************************************************************** */

  popup(id, item) {
    $(".circle-sec .fa.fa-circle:eq(0)");

    (this.activeProductImage == "" ? this.activeProductImage = item.images[0].src : "")
    this.spinner.show()
    this.HomeService.productId(id).subscribe((response) => {
      var short = response.users.product.body_html.split("|");
      if (short[1]) {
        this.shortdescription = short[1].replace(/<[^>]*>/g, '');
      } else {
        this.shortdescription = "";
      }
      var long = short[0].replace(/<[^>]*>/g, '');
      this.longdescription = long;
      this.price = response.users.product.variants[0].price;
      this.productIngrediant = response.ingrediantsDetails[0];
      this.reviewProduct = response.users;

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

  /********************************************************************************** */
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

  /**********************************************************************************8 */

  onClickMe(id) {
    this.spinner.show();
    this.HomeService.LipsID(id).subscribe((response) => {
      this.spinner.hide();
      this.products = response.Lipresult;

    });
  }

  /*********************************************************************************** */

  add() {
    this.count++;
  }

  /*********************************************************************************** */

  sub() {
    if (this.count <= 0) {
      this.count = 0
    } else {
      this.count--;
    }

  }

  /************************************************************************************ */
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
      /*   $(".circle-sec .shade-common ." + colorName + "").addClass('active').css("background-color", colorName); */
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
    /* $(".shade-common [initialcolor=" + item + "]").click(); */
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

  /*********************************************************************************** */
  checkbox(items, event, title) {
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

  /******************************************************************************* */
  onChecked(e: Event, item) {
    $("input:not(#" + item + ")").prop("checked", false);
    const checkbox = e.target as HTMLInputElement;

    if (!checkbox.checked) {
      $('.re_sidebar').removeClass("active");
      this.route.navigate(['eyes/81913905201']);
    } else {

      this.route.navigate(['lips/' + item + '']);
      $("#" + item + ".re_sidebar").addClass("active");

    }
  }

  /*************************************************************************************8 */

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


/*************************************************************************************8 */