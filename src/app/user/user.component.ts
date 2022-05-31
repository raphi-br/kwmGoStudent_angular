

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NachhilfeStoreService} from "../shared/nachhilfe-store.service";
import {Offer} from "../shared/offer";
import {User} from "../shared/user";
import {NachhilfeFactory} from "../shared/nachhilfe-factory";
import {UserFactory} from "../shared/user-factory";
import {UserService} from "../shared/user.service";
@Component({
  selector: 'bs-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {
  offers: Offer = NachhilfeFactory.empty();
  user: User = UserFactory.empty();

  constructor(
    private us: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.us.getSingleUser(this.getCurrentUserId()).subscribe(res=>this.user =res);
  }

  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }


}
