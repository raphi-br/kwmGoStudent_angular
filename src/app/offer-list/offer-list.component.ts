import{Component, EventEmitter, OnInit, Output, Input}from'@angular/core';
import {Offer} from "../shared/offer";
import {NachhilfeStoreService} from "../shared/nachhilfe-store.service";

@Component({
  selector: 'bs-offer-list',
  templateUrl: './offer-list.component.html',
  styles: [
  ]
})
export class OfferListComponent implements OnInit {
  offers: Offer[] = [];
  @Output() showDetailsEvent = new EventEmitter<Offer>();

  constructor(private bs: NachhilfeStoreService) { }

  ngOnInit() {
    //abboniert Observables
    this.bs.getAll().subscribe(res => this.offers = res);
    console.log(this.offers);
  }


  showDetails(offer:Offer) {
    this.showDetailsEvent.emit(offer)
  }
}
