import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormGroupName, Validators} from "@angular/forms";
import {NachhilfeFactory} from "../shared/nachhilfe-factory";
import {ActivatedRoute, Router} from "@angular/router";
import {NachhilfeStoreService} from "../shared/nachhilfe-store.service";
import {Offer} from "../shared/offer";
import {OfferFormErrorMessages} from "./offer-form-error-messages";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'bs-offer-form',
  templateUrl: './offer-form.component.html',
  styles: []
})
export class OfferFormComponent implements OnInit {

  offerForm: FormGroup;
  offer = NachhilfeFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingOffer = false;
  appointments: FormArray;

  constructor(private fb: FormBuilder,
              private bs: NachhilfeStoreService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe) {
    this.offerForm = this.fb.group({});
    this.appointments = this.fb.array([]);
  }


  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isUpdatingOffer = true;
      this.bs.getSingle(id).subscribe(offer => {
        this.offer = offer;
        this.initOffer();
      });
    }
    this.initOffer();

    console.log(this.appointments);
  }

  initOffer() {
    this.buildAppointmentArray();
    this.offerForm = this.fb.group({
      id: this.offer.id,
      title: [this.offer.title, Validators.required],
      subject: [this.offer.subject, Validators.required],
      description: this.offer.description,
      appointments: this.appointments
    });
    this.offerForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }


  submitForm() {
    const offer: Offer = NachhilfeFactory.fromObject(this.offerForm.value);
    console.log(offer);
    if (this.isUpdatingOffer) {
      console.log(offer + "submit-if");
      this.bs.update(offer).subscribe(res => {
        this.router.navigate(["../../offers", offer.id],
          {
            relativeTo: this.route
          });
      });
    } else {
      offer.user_id = 1;// just for testing
      console.log("Offer: else" );
      console.log(offer);
      this.bs.create(offer).subscribe(res => {
        this.offer = NachhilfeFactory.empty();
        this.offerForm.reset(NachhilfeFactory.empty());
        this.router.navigate(["../offers"], {
          relativeTo: this.route
        });
      });
    }
  }

  //Errormessage
  updateErrorMessages() {
    console.log("Is invalid? " + this.offerForm.invalid);
    this.errors = {};
    for (const message of OfferFormErrorMessages) { //Output of Errormessage in file offer-form-error-messages.ts
      const control = this.offerForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  buildAppointmentArray() {
    if (this.offer.appointments) {
      this.appointments = this.fb.array([]);
      for (let app of this.offer.appointments) {
        console.log("line 108");
        let fg = this.fb.group({
          id: new FormControl(app.id),
          date: new FormControl(app.date, [Validators.required]),
          time: new FormControl((app.time), [Validators.required])
        });
        console.log("114");
        console.log(app.date, app.time);
        this.appointments.push(fg);
      }
    }
  }

/*  timeFunction(time: Time) {
    console.log(time.toString());
  }*/

/*  formatDate(date: any) {
    let newDate = date.toString();
    let res = newDate.replace(" ", "T");
    console.log(res);
    return res;
  }

  dateFunction(date: any) {
    console.log();
    let year=date.getFullYear();
    let month= date.getMonth()+1;
    let day= date.getDay()+1;
    if(month < 10){
      month = Number("0"+month);
    }
    if(day < 10){
      day = Number("0"+day);
    }
    console.log(year, month, day)
    return (year+"-"+month+"-"+day);

    let datum = date.toString();
    console.log(datum);

  }*/

  addAppointmentControl() {
    this.appointments.push(this.fb.group({date: new Date(), time: null, id: 0}));
  }
}
