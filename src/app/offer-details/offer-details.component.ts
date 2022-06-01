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
import {UserService} from "../shared/user.service";
import {UserComponent} from "../user/user.component";
import {User} from "../shared/user";
import {UserFactory} from "../shared/user-factory";
import {ToastrService} from "ngx-toastr";
import * as moment from 'moment';


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

  user: User = UserFactory.empty();

  constructor(
    private fb: FormBuilder,
    public bs: NachhilfeStoreService,
    private us: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthenticationService,
    private toastr: ToastrService
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

    this.us.getSingleUser(this.authService.getCurrentUserId()).subscribe(res => this.user = res);
  }

  //Löschen des Angebotes
  removeOffer() {
    if (confirm('Angebot wirklich löschen?')) {
      this.toastr.success("Das Angebot wurde erfolgreich gelöscht!", "Erfolgreich gelöscht!")
      this.bs.remove(this.offer.id)
        .subscribe(res => this.router.navigate(['../'], {
          relativeTo:
          this.route
        }));
    } else {
      this.toastr.error("Angebot wurde nicht gelöscht", "Abbruch!")
    }
  }

  //Termin annehmen
  bookAppointment(appointment: Appointment) {
    appointment.user_id = this.authService.getCurrentUserId();
    //toast message?
    this.toastr.success("Der Termin wurde erfolgreich gebucht!", "Erfolgreiche Buchung!")
    this.bs.bookAppointment(appointment).subscribe(res => this.router.navigate(['../'], {
      relativeTo:
      this.route
    }));
  }

  //Termin löschen
  removeAppointment(appointment: Appointment) {
    if (!appointment.user_id) {
      if (confirm('Termin wirklich löschen?')) {
        this.toastr.success("Der Termin wurde erfolgreich gelöscht!", "Erfolgreich gelöscht!")
        this.bs.removeAppointment(appointment).subscribe(res => this.router.navigate(['../'], {
          relativeTo: this.route
        }));
      } else {
        this.toastr.error("Termin wurde nicht gelöscht!", "Abbruch!")
      }
    }
  }

  //Kommentar erstellen
  submitComment() {
    const comment: Comment = CommentFactory.fromObject(this.commentForm.value);
    const id = this.route.snapshot.params["id"];
    // todo user
    comment.user_id = 1;
    comment.offer_id = id;
    this.bs.createComment(comment).subscribe(res => {
      this.comment = CommentFactory.empty();
      this.commentForm.reset(comment);
      this.toastr.success("Kommentar wurde erfolgreich gesendet!", "Erfolgreicher Kommentar!")
      this.router.navigate([`offers`]);
    });
  }

  renderDate(date: any) {
    return moment(date).format("Do MMM YYYY");
  }

  getUser(id: number){
    this.us.getSingleUser(id).subscribe(res => this.user = res);
  }
}
