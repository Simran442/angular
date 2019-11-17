import { Component, Input, Output, EventEmitter, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../services/home.service';
declare var $: any;
import { first } from 'rxjs/operators';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


interface ICompany {
  id: number;
  rating: number;
  contact: string;
  company: string;
}


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, AfterViewChecked {

  sub: any;
  id: any;
  hide: any;

  productid: number;
  rating: number;
  @Input() itemId: number;
  //@Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
  inputName: string;
  products: any;
  ratingClicked: number;
  itemIdRatingClicked: string;


  registerForm: FormGroup;
  loading = false;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private HomeService: HomeService,
    private spinner: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = + params['id']; // (+) converts string 'id' to a number
      this.hide = false;
      this.productid = this.id;
    });
    this.productsID(this.id);

    this.inputName = '_rating';
    this.registerForm = this.formBuilder.group({
      productid: this.productid,
      review_handline: ['', Validators.required],
      comments: ['', Validators.required],
      nickname: ['', Validators.required],
      location: ['', Validators.required],
      email: ['', Validators.required],


    });

  }

  /********************************************************************************************8 */
  ngAfterViewChecked() {
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  }


  /*************************************************************************** */
  productsID(id) {
    this.spinner.show();
    this.HomeService.productId(id).subscribe((response) => {

      this.products = response.users;
      this.spinner.hide()
    });
  }


  /********************************************************************************** */
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.HomeService.review(this.registerForm.value, this.rating)
      .pipe(first())
      .subscribe(
        data => {

          this.router.navigate(['onclick/' + this.id]);
        },
        error => {

          this.loading = false;
        });
  }


  /************************************************************************************* */
  ratingComponentClick(clickObj: any): void {

    this.rating = clickObj.rating;
    this.ratingClicked = clickObj.rating;
  }

  /*************************************************************************************** */
  onClick(rating: number): any {

    this.rating = rating;

  }
}

/******************************************************************************************8 */