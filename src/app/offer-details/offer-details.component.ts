import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Offer} from "../shared/offer";
import {NachhilfeStoreService} from "../shared/nachhilfe-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NachhilfeFactory} from "../shared/nachhilfe-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {Appointment} from "../shared/appointment";
import {Comment} from "../shared/comment";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CommentFactory} from "../shared/comment-factory";


@Component({
  selector: 'bs-offer-details',
  templateUrl: './offer-details.component.html',
  styles: [
  ]
})
export class OfferDetailsComponent implements OnInit {
  offer: Offer = NachhilfeFactory.empty();
  comment = CommentFactory.empty();
  commentForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private bs: NachhilfeStoreService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthenticationService,
  ) {
    this.commentForm = this.fb.group({});
  }


  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.bs.getSingle(params['id']).subscribe(o => this.offer = o);
    this.commentForm = this.fb.group({
      id: this.comment.id,
      title: [this.comment.title, Validators.required],
      commenttext: [this.comment.commenttext, Validators.required],
      user_id: this.comment.user_id,
      offer_id: this.comment.offer_id
    });
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
  bookAppointment(appointment: Appointment) {
    console.log(this.authService.getCurrentUserId());
    appointment.user_id = this.authService.getCurrentUserId();
    //toast message?
    console.log(appointment);
    this.bs.bookAppointment(appointment).subscribe(res => this.router.navigate(['../'], {
      relativeTo:
      this.route
    }));
  }

  //Termin löschen
  removeAppointment(appointment: Appointment) {
    if (!appointment.user_id) {
      if (confirm('Termin wirklich löschen?')) {
        this.bs.removeAppointment(appointment).subscribe(res => this.router.navigate(['../'], {
          relativeTo: this.route
        }));
      }
    }
  }

  //Kommentar erstellen

  submitComment() {
    const comment:Comment = CommentFactory.fromObject(this.commentForm.value);
    const id = this.route.snapshot.params["id"];
    // todo user
    comment.user_id = 1;
    comment.offer_id = id;
    this.bs.createComment(comment).subscribe(res=>{
      this.comment = CommentFactory.empty();
      this.commentForm.reset(comment);
      this.router.navigate([`offers`]);
    });
  }
}
