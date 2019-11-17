import { HomepageComponent } from './homepage/homepage.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRouting } from './app.routing';
import { NewpageComponent } from './newpage/newpage.component';
import { BlogpageComponent } from './blogpage/blogpage.component';
import { FooterComponent } from './footer/footer.component';
import { BackendApiService } from './services/backend-api.service';
import { HomeService } from './services/home.service';
import { HttpModule } from '@angular/http';
import { AllmakeupComponent } from './allmakeup/allmakeup.component';
import { OnclickComponent } from './onclick/onclick.component';
import { MakeupComponent } from './makeup/makeup.component';
import { LipspageComponent } from './lipspage/lipspage.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EyespageComponent } from './eyespage/eyespage.component';
import { FacepageComponent } from './facepage/facepage.component';
import { HeaderComponent } from './header/header.component';
import { ArticalblogComponent } from './articalblog/articalblog.component';
import { ReviewComponent } from './review/review.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './about-us/about-us.component';
import { RatingComponent } from './rating/rating.component';
import { SkincareComponent } from './skincare/skincare.component';
import { SetsComponent } from './sets/sets.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { JasperoAlertsModule } from '@jaspero/ng-alerts';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AngularPaginatorModule } from 'angular-paginator';
import { PasswordComponent } from './password/password.component';
import { LoginComponent } from './login/login.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SignupComponent } from './signup/signup.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NewpageComponent,
    BlogpageComponent,
    FooterComponent,
    AllmakeupComponent,
    OnclickComponent,
    MakeupComponent,
    LipspageComponent,
    EyespageComponent,
    FacepageComponent,
    HeaderComponent,
    ArticalblogComponent,
    ReviewComponent,
    IngredientsComponent,
    AboutUsComponent,
    RatingComponent,
    SkincareComponent,
    SetsComponent,
    CheckoutComponent,
    AddtocartComponent,
    PasswordComponent,
    LoginComponent,
    ResetpasswordComponent,
    SignupComponent,
    SidebarComponent,

    
  ],
  imports: [
    
    BrowserModule,
    NgxPaginationModule,
    AppRouting,
    HttpModule,
    AngularPaginatorModule,
    NgxSpinnerModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgHttpLoaderModule.forRoot(),
    JasperoAlertsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,  
    FlashMessagesModule.forRoot(),
    CarouselModule,
    BrowserAnimationsModule,
  ],
  providers: [BackendApiService, HomeService],
  bootstrap: [AppComponent]
})
export class AppModule {}







