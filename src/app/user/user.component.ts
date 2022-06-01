

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NachhilfeStoreService} from "../shared/nachhilfe-store.service";
import {Offer} from "../shared/offer";
import {User} from "../shared/user";
import {NachhilfeFactory} from "../shared/nachhilfe-factory";
import {UserFactory} from "../shared/user-factory";
import {UserService} from "../shared/user.service";
import {AuthenticationService} from "../shared/authentication.service";
import {Appointment} from "../shared/appointment";
@Component({
  selector: 'bs-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {
  offers: Offer[] =[];
  user: User = UserFactory.empty();
  appointments: Appointment[] = [];
  @Input() offer: Offer | undefined;

  constructor(
    private bs: NachhilfeStoreService,
    private us: UserService,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.bs.getUserAppointments(this.authService.getCurrentUserId().toString()).subscribe(a => this.appointments = a);

    this.bs.getAll().subscribe(reso => this.offers = reso);

    this.us.getSingleUser(this.getCurrentUserId()).subscribe(res=>this.user =res);
  }

  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }



  /*public getBookedItems(){
    let bookedItems = [];
    for (let off of this.offers){
      if(off.appointments){
      for(let app of off.appointments){
        if (app.user_id == this.getCurrentUserId()){
          bookedItems.push(app);

        }
      }
    }
  }
    return bookedItems;
  }*/

}
