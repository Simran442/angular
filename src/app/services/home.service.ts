
import { BackendApiService } from './backend-api.service';
import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { HttpHeaders, HttpClient } from '@angular/common/http';
const httpOptions = {
    headers: new Headers({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class HomeService {

    public api_url: any;

    constructor(public http: Http, private global: BackendApiService) {
        this.api_url = this.global.api_url;
    }

    plans(page) {
        return this.http.get(this.api_url.concat('listData/' + page), {}).pipe(
            map((res: Response) => res.json()));

    }

    skincareProduct() {
        return this.http.get(this.api_url.concat('SkincareProducts'), {}).pipe(
            map((res: Response) => res.json()));
    }

    Skincarecontent() {
        return this.http.get(this.api_url.concat('/Pagecontent/22623387697'), {}).pipe(
            map((res: Response) => res.json())
        )
    }

    newLineup() {
        return this.http.get(this.api_url.concat('newOurLineUp'), {}).pipe(
            map((res: Response) => res.json()));

    }

    comboPack() {
        return this.http.get(this.api_url.concat('combopack'), {}).pipe(
            map((res: Response) => res.json()));

    }

    Lips() {
        return this.http.get(this.api_url.concat('LipsProducts'), {}).pipe(
            map((res: Response) => res.json())
        );
    }


    LipsID(id) {
        return this.http.get(this.api_url.concat('LipsProducts/' + id), {}).pipe(
            map((res: Response) => res.json())
        );
    }


    subcategories(id) {
        return this.http.get(this.api_url.concat('Subcategory/' + id), {}).pipe(
            map((res: Response) => res.json())
        )
    }



    allcategory() {
        return this.http.get(this.api_url.concat('Allcategory'), {}).pipe(
            map((res: Response) => res.json())
        )

    }

    lipcontent() {
        return this.http.get(this.api_url.concat('lipsContent'), {}).pipe(
            map((res: Response) => res.json())
        )
    }

    eyecontents() {
        return this.http.get(this.api_url.concat('eyesContent'), {}).pipe(
            map((res: Response) => res.json())
        )
    }

    facecontents() {
        return this.http.get(this.api_url.concat('faceContent'), {}).pipe(
            map((res: Response) => res.json())
        )
    }

    homecontent() {
        return this.http.get(this.api_url.concat('/Pagecontent/22624108593'), {}).pipe(
            map((res: Response) => res.json())
        )
    }

    setscontent() {
        return this.http.get(this.api_url.concat('/Pagecontent/22623420465'), {}).pipe(
            map((res: Response) => res.json())
        )
    }

    MediaInstagram() {
        return this.http.get(this.api_url.concat('/MediaInstagram'), {}).pipe(
            map((res: Response) => res.json())
        )
    }

    productId(id) {
        return this.http.get(this.api_url.concat('onclick/' + id), {}).pipe(
            map((res: Response) => res.json())
        )
    }

    review(user,rating) {

        return this.http.post(this.api_url.concat('review'), {
            user: user , rating:rating
        }).pipe(
            map((res: Response) => res.json())
        )
    }

    reviewrating(id) {
        return this.http.get(this.api_url.concat('review/'+ id), {}).pipe(
            map((res: Response) => res.json())
        )
    }


    register(email) {


        return this.http.post(this.api_url.concat('register'), {
            email: email

        }).pipe(
            map((res: Response) => res.json())
        )

    }

    password(id, password) {

        return this.http.post(this.api_url.concat('password/' + id), {
            password: password
        }).pipe(
            map((res: Response) => res.json())
        )
    }


    login(email, password) {


        return this.http.post(this.api_url.concat('login'), {
            email: email, password: password
        }).pipe(
            map((res: Response) => res.json())
        )

    }

    signup(customerDetail) {
        return this.http.post(this.api_url.concat('signup'), {
            customerDetail: customerDetail
        }).pipe(
            map((res: Response) => res.json())
        )
    }


    resetpassword(email) {


        return this.http.post(this.api_url.concat('resetpassword'), {
            email: email
        }).pipe(
            map((res: Response) => res.json())
        )

    }



    addtocart(title, price, id, img, quantity, shades) {
        return this.http.post(this.api_url.concat('addToCart'), {
            title: title, price: price, id: id, img: img, quantity: quantity, shades: shades
        }).pipe(
            map((res: Response) => res.json())
        )

    }

    addtocartGet() {
        return this.http.get(this.api_url.concat('addToCart'), {}).pipe(
            map((res: Response) => res.json())
        )
    }


    featured_Lip() {
        return this.http.get(this.api_url.concat('Featured_Lip_Products'), {}).pipe(
            map((res: Response) => res.json())
        )
    }
    featured_eye() {
        return this.http.get(this.api_url.concat('Featured_eye_Products'), {}).pipe(
            map((res: Response) => res.json())
        )
    }
    featured_face() {
        return this.http.get(this.api_url.concat('Featured_face_Products'), {}).pipe(
            map((res: Response) => res.json())
        )
    }



    addtocartss() {

        return this.http.get('https://miaawwws.myshopify.com/cart.js', {}).pipe(
            map((res: Response) => res.json())
        )

    }


    articleBlog(id, item) {
        return this.http.get(this.api_url.concat('articleBlog/id/item'), {}).pipe(
            map((res: Response) => res.json())
        )

    }

    Blogs() {
        return this.http.get(this.api_url.concat('blog'), {}).pipe(
            map((res: Response) => res.json())
        )

    }


    getCustomer() {
        return this.http.get(this.api_url.concat('getCustomer'), {}).pipe(
            map((res: Response) => res.json())
        )
    }

    getcheckouts() {
        return this.http.get(this.api_url.concat('getCheckout'), {}).pipe(
            map((res: Response) => res.json())
        )
    }




    postcheckouts(email, lineitems) {
        return this.http.post(this.api_url.concat('CreateCheckout'), {
            email: email, lineitems: lineitems
        }).pipe(
            map((res: Response) => res.json())
        )

    }

    customerInden(email) {
        return this.http.post(this.api_url.concat('customerInden'), {
            email: email
        }).pipe(
            map((res: Response) => res.json())
        )

    }

    savecheckout(email, checkoutid) {
        return this.http.post(this.api_url.concat('savecheckout'), {
            email: email, checkout: checkoutid
        }).pipe(
            map((res: Response) => res.json())
        )
    }
}
