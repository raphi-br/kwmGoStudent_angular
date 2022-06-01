import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OfferListComponent} from "./offer-list/offer-list.component";
import {OfferDetailsComponent} from "./offer-details/offer-details.component";
import {OfferFormComponent} from "./offer-form/offer-form.component";
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'offers', component: OfferListComponent},
  {path: 'offers/:id', component: OfferDetailsComponent},
  {path: 'admin', canActivate:[CanNavigateToAdminGuard], component: OfferFormComponent},
  {path: 'admin/:id', canActivate:[CanNavigateToAdminGuard], component: OfferFormComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: UserComponent},
  {path: 'profile/:id', component: OfferDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanNavigateToAdminGuard]
})
export class AppRoutingModule { }
