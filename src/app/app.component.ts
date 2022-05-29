import { Component } from '@angular/core';
import {Offer} from "./shared/offer";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  /*listOn=true;
  detailsOn=false;*/

  constructor(private authService: AuthenticationService) {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    if (this.isLoggedIn()){
      return"Logout";
    }else{
      return"Login";
    }
  }
}
