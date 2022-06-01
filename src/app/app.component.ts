import { Component } from '@angular/core';
import {Offer} from "./shared/offer";
import {AuthenticationService} from "./shared/authentication.service";
import {UserService} from "./shared/user.service";
import {User} from "./shared/user";
import {UserFactory} from "./shared/user-factory";
import {NachhilfeStoreService} from "./shared/nachhilfe-store.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  /*listOn=true;
  detailsOn=false;*/

  user: User = UserFactory.empty();

  constructor(private fb: FormBuilder,
              public bs: NachhilfeStoreService,
              private us: UserService,
              public authService: AuthenticationService,
              ) {
  }

  ngOnInit(){
    this.us.getSingleUser(this.authService.getCurrentUserId()).subscribe(res => this.user = res);
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
