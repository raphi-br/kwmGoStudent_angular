import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from "rxjs";
import {NachhilfeStoreService} from "../shared/nachhilfe-store.service";
import {Offer} from "../shared/offer";


@Component({
  selector: 'bs-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  keyup = new EventEmitter<string>()
  foundOffers: Offer[] = [];
  isLoading = false;
  @Output() offerSelected = new EventEmitter<Offer>();

  constructor(private bs: NachhilfeStoreService) { }

  //debounceTime: Break for REST Call - after 500ms RestCall
  //distinctUntilChanged: only when searchterm changed
  //tap: Loading
  ngOnInit(): void {
    this.keyup.pipe(filter(term => term !=""))
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(()=> this.isLoading = true ))
      .pipe(switchMap(searchTerm => this.bs.getAllSearch(searchTerm)))
      .pipe(tap(()=> this.isLoading = false ))
      .subscribe(offers => this.foundOffers = offers);
  }

}
