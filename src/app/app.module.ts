import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferListItemComponent } from './offer-list-item/offer-list-item.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import {NachhilfeStoreService} from "./shared/nachhilfe-store.service";
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { SearchComponent } from './search/search.component';
import { OfferFormComponent } from './offer-form/offer-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import {DatePipe, registerLocaleData} from "@angular/common";
import localeDE from '@angular/common/locales/de';

registerLocaleData(localeDE);
/*
import { ProfileComponent } from './profile/profile.component';
*/

@NgModule({
  declarations: [
    AppComponent,
    OfferListComponent,
    OfferListItemComponent,
    OfferDetailsComponent,
    HomeComponent,
    SearchComponent,
    OfferFormComponent,
    LoginComponent,
    /*ProfileComponent*/
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, //animations for toastr
    ToastrModule.forRoot(),  //notifications toastr module added
    ReactiveFormsModule //Import of Form
  ],
  providers: [NachhilfeStoreService, AuthenticationService, DatePipe,
    {
    provide: LOCALE_ID,
    useValue: 'de'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
