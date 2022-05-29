/*
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Profile} from './profile'
import {Offer} from "./offer";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private api: string = "http://nachhilfe.s1910456002.student.kwmhgb.at/api/profile"

  constructor(private http: HttpClient) { }

  get(id: number): Observable<Profile>{
    return this.http.get<Profile>(`${this.api}/user/${id}`)
  }
}
*/
