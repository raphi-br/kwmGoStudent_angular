import { Injectable } from '@angular/core';
import {Offer} from "./offer";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Appointment} from "./appointment";
import {Comment} from "./comment";
import {User} from "./user";

@Injectable()
export class NachhilfeStoreService {
  private api = 'http://nachhilfe.s1910456002.student.kwmhgb.at/api';

/*offers: Offer[];*/

  constructor(private http: HttpClient) {
  }

  //return all Offers - List
  getAll(): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(`${this.api}/offers`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //return one Offer - detaillist (Details of Offers)
  //try max 3 times
  getSingle(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.api}/offers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //create an Offer via Post
  //try max 3 times
  create(offer: Offer): Observable<any> {
    return this.http.post(`${this.api}/offers`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //update an Offer
  update(offer: Offer): Observable<any> {
    return this.http.put(`${this.api}/offers/${offer.id}`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //delete or remove one offer
  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/offers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Error Handler
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

  //search Offers
  getAllSearch(searchTerm: string): Observable<Array<Offer>> {
    return this.http.get<Offer>(`${this.api}/offers/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //book Appointment
  bookAppointment(appointment: Appointment): Observable<any> {
    return this.http.put(`${this.api}/appointments/book/${appointment.id}`, appointment)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //termin löschen
  removeAppointment(appointment: Appointment):Observable<any>{
    return this.http.delete(`${this.api}/appointments/delete/${appointment.id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //create Comment
  createComment(comment: Comment): Observable<any> {
    return this.http.post(`${this.api}/comments`, comment)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //return all Users
  getAllUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.api}/users`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  //return one User
  getSingleUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/users/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
}


