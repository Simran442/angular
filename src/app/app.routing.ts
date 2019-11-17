import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomepageComponent } from './homepage/homepage.component';
import { NewpageComponent } from './newpage/newpage.component';
import { BlogpageComponent } from './blogpage/blogpage.component';
import { FooterComponent } from './footer/footer.component';
import { AllmakeupComponent } from './allmakeup/allmakeup.component';
import { OnclickComponent } from './onclick/onclick.component';
import { MakeupComponent } from './makeup/makeup.component';
import { LipspageComponent } from './lipspage/lipspage.component';
import { EyespageComponent } from './eyespage/eyespage.component';
import { FacepageComponent } from './facepage/facepage.component';
import { ArticalblogComponent } from './articalblog/articalblog.component';
import { ReviewComponent } from './review/review.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SkincareComponent } from './skincare/skincare.component';
import { SetsComponent } from './sets/sets.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { PasswordComponent } from './password/password.component';
import { LoginComponent } from './login/login.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SignupComponent } from './signup/signup.component';


const appRoutes: Routes = [

    { path: '', component: HomepageComponent, pathMatch: 'full' },
    { path: '', component: FooterComponent, pathMatch: 'full' },
    // { path: 'login',    component: LoginComponent },

    {
        path: 'home',
        component: HomepageComponent
    },
    {
        path: 'account/login',
        component: LoginComponent

    },
    {

        path: 'account/signup',
        component: SignupComponent
    },
    {
        path: 'password/:id',
        component: PasswordComponent
    },

    {
        path: 'new',
        component: NewpageComponent
    },
    {
        path: 'blog',
        component: BlogpageComponent
    },
    {
        path: 'allmakeup',
        component: AllmakeupComponent
    },
    {
        path: 'onclick/:id',
        component: OnclickComponent
    },
    {
        path: 'blogArtical/:id/:itemId',
        component: ArticalblogComponent
    },
    {
        path: 'makeup',
        component: MakeupComponent
    },
    {
        path: 'Sub/lips/:id',
        component: LipspageComponent
    },
    {
        path: 'lips/:id',
        component: LipspageComponent
    },
    {
        path: 'eyes/:id',
        component: EyespageComponent
    },
    {
        path: 'face/:id',
        component: FacepageComponent
    },
    /*  {
         path: 'blogArtical',
         component: ArticalblogComponent 
     }, */
    {
        path: 'review/:id',
        component: ReviewComponent
    },
    {
        path: 'Ingredients',
        component: IngredientsComponent
    },
    {
        path: 'AboutUs',
        component: AboutUsComponent
    },
    {
        path: 'Skincare',
        component: SkincareComponent
    },
    {
        path: 'Sets',
        component: SetsComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: 'cart',
        component: AddtocartComponent
    }, {
        path: 'resetpassword',
        component: ResetpasswordComponent
    }


];

export const AppRouting = RouterModule.forRoot(appRoutes);


