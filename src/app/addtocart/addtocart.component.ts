import { Router } from '@angular/router';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HomeService } from './../services/home.service';
import { Http } from '@angular/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $: any;
import ShopifyBuy from 'shopify-buy';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit, AfterViewChecked {
  checkout: any;
  count: number = 1;
  updateid: any;
  quantity: any;
  quantityNbr: number = 0;
  lineItems: number = 2;
  constructor(private route: Router, private HomeService: HomeService, private spinner: Ng4LoadingSpinnerService) { }

  ngOnInit() {

    this.newproduct()
    window.scrollTo(0, 0)
  }

  ngAfterViewChecked() {
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  }

  /***************************************************************************8 */
  newproduct() {
    this.spinner.show()
    var shopClient = ShopifyBuy.buildClient({
      storefrontAccessToken: '10e55cf8f17988e1fb3a81ade7f5c085',
      domain: '@innerbeautyco.myshopify.com',
    });
    var checkoutId = localStorage.getItem('checkoutID')

    shopClient.checkout.fetch(checkoutId).then((checkout) => {

      this.checkout = checkout;
      this.spinner.hide()
    });
  }


  /****************************************************************************** */
  listproduct(email) {

    this.HomeService.customerInden(email).subscribe((response) => {
      this.spinner.show();
      var shopClient = ShopifyBuy.buildClient({
        storefrontAccessToken: '10e55cf8f17988e1fb3a81ade7f5c085',
        domain: '@innerbeautyco.myshopify.com',
      });

      const checkoutId = response.data.checkout_token;

      shopClient.checkout.fetch(checkoutId).then((checkout) => {

        // Do something with the checkout
        this.checkout = checkout;

      });

    })

  }

  /***************************************************************************8 */
  checkoutId() {
    this.route.navigate(['/checkout']);
  }


  /*****************************************************************************8 */
  UpdateItem() {
    this.spinner.show()
    var updated = [];
    $("form.cart tbody tr").each(function () {
      updated.push(
        {
          id: $("td.cart__image-wrapper input", this).val(),
          quantity: parseInt($("td input.input-text.qty.text", this).val())
        }
      );
    });

    updated.forEach(element => {
      this.quantityNbr = this.quantityNbr + element.quantity;

    });

    localStorage.setItem('quantity', this.quantityNbr.toString());
    var shopClient = ShopifyBuy.buildClient({
      storefrontAccessToken: '10e55cf8f17988e1fb3a81ade7f5c085',
      domain: '@innerbeautyco.myshopify.com',
    });

    const checkoutId = localStorage.getItem('checkoutID'); // ID of an existing checkout
    var lineItemsToUpdate = updated;

    // Update the line item on the checkout (change the quantity or variant)
    shopClient.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then((checkout) => {
      this.spinner.hide()
      window.location.reload();
    });
  }


  /***************************************************************************8 */
  removeItem(id, remove_amount) {
    var amount = localStorage.getItem('quantity');
    var update_amount = parseInt(amount) - remove_amount;
    localStorage.setItem('quantity', update_amount.toString());

    $("div.failure").fadeIn(300).delay(1500).fadeOut(400);
    var shopClient = ShopifyBuy.buildClient({
      storefrontAccessToken: '10e55cf8f17988e1fb3a81ade7f5c085',
      domain: '@innerbeautyco.myshopify.com',
    });

    const checkoutId = localStorage.getItem('checkoutID'); // ID of an existing checkout
    // ID of an existing checkout
    const lineItemIdsToRemove = [
      id
    ];

    // Remove an item from the checkout
    shopClient.checkout.removeLineItems(checkoutId, lineItemIdsToRemove).then((checkout) => {
      $("div.warning").fadeIn(300).delay(1500).fadeOut(500, function () {
        window.location.reload();
      });

    });
  }

  /******************************************************************************** */

  add(id, qunatity, event) {
    var amount = localStorage.getItem('quantity');
    this.spinner.show()
    var that = this;
    var target = event.target || event.srcElement || event.currentTarget;
    var notificationQuantity = parseInt(amount);
    notificationQuantity += 1;
    $(".countity span").text(notificationQuantity);
    localStorage.setItem('quantity', notificationQuantity.toString());
    this.spinner.hide();
    this.updateid = id + 1;
    var shopClient = ShopifyBuy.buildClient({
      storefrontAccessToken: '10e55cf8f17988e1fb3a81ade7f5c085',
      domain: '@innerbeautyco.myshopify.com',
    });


    const checkoutId = localStorage.getItem('checkoutID'); // ID of an existing checkout
    var lineItemsToUpdate = [
      { id: qunatity, quantity: this.updateid }
    ];

    // Update the line item on the checkout (change the quantity or variant)
    shopClient.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then((checkout) => {
      // Do something with the updated checkout
      var currentRow = $(target).parents("tr");
      that.checkout = checkout;
      $(".cart__subtotal").text("$" + checkout.totalPrice);
      $("div.success").fadeIn(300).delay(1500).fadeOut(400);
      this.spinner.hide();
    });
    //this.count++;
  }

  /***************************************************************************** */
  sub(id, qunatity, event) {
    var amount = localStorage.getItem('quantity');
    var that = this;

    var target = event.target || event.srcElement || event.currentTarget;
    var notificationQuantity = parseInt(amount);
    notificationQuantity -= 1;
    $(".countity span").text(notificationQuantity);
    localStorage.setItem('quantity', notificationQuantity.toString());
    this.spinner.show();
    this.updateid = id - 1;
    var shopClient = ShopifyBuy.buildClient({
      storefrontAccessToken: '10e55cf8f17988e1fb3a81ade7f5c085',
      domain: '@innerbeautyco.myshopify.com',
    });


    const checkoutId = localStorage.getItem('checkoutID'); // ID of an existing checkout
    var lineItemsToUpdate = [
      { id: qunatity, quantity: this.updateid }
    ];

    // Update the line item on the checkout (change the quantity or variant)
    shopClient.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then((checkout) => {
      // Do something with the updated checkout
      var currentRow = $(target).parents("tr");
      $(".cart__subtotal").text("$" + checkout.totalPrice);
      $("div.warning").fadeIn(300).delay(1500).fadeOut(400);
      that.checkout = checkout;
      this.spinner.hide()
    });
  }


  /**************************************************************************** */
  history() {
    window.history.back()
  }
}


/************************************************************************8 */
/**
 * end of the file
 */