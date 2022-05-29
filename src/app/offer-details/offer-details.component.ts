import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Offer} from "../shared/offer";
import {NachhilfeStoreService} from "../shared/nachhilfe-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NachhilfeFactory} from "../shared/nachhilfe-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {Appointment} from "../shared/appointment";
import {Comment} from "../shared/comment";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'bs-offer-details',
  templateUrl: './offer-details.component.html',
  styles: [
  ]
})
export class OfferDetailsComponent implements OnInit {
  offer: Offer = NachhilfeFactory.empty();


  constructor(
    private bs: NachhilfeStoreService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthenticationService,
  ) { }


  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.bs.getSingle(params['id']).subscribe(o => this.offer = o);
  }

  //Löschen des Angebotes
  removeOffer() {
    if (confirm('Angebot wirklich löschen?')) {
      this.bs.remove(this.offer.id)
        .subscribe(res => this.router.navigate(['../'], {
          relativeTo:
          this.route
        }));
    }
  }

  //Termin annehmen
  bookAppointment(appointment: Appointment){
    console.log(this.authService.getCurrentUserId());
     appointment.user_id = this.authService.getCurrentUserId();
     //toast message?
     console.log(appointment);
     this.bs.bookAppointment(appointment).subscribe(res => this.router.navigate(['../'], {
       relativeTo:
       this.route
     }));
   }
}
