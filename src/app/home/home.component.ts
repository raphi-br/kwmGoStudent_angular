import { Component, OnInit } from '@angular/core';
import {Offer} from "../shared/offer";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bs-home',
  template: `
    <div class="header" >
      <img src="../../assets/header.jpg" style="width: 100%; background-size: cover">
    </div>
    <div class="ui container">
      <h1>Home</h1>
      <p>Das ist der KWM Nachhilfeservice.</p>
      <a routerLink="../offers" class="ui red button"> Nachhilfeliste ansehen </a>
      <bs-search (offerSelected)="offerSelected($event)" class="column"></bs-search>
    </div>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  offerSelected(offer: Offer) {
    this.router.navigate(['../offers', offer.id], {relativeTo: this.route});
  }
}
