import {catchError, Observable, retry, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {Injectable} from "@angular/core";



@Injectable()

export class UserService {

  private api = 'http://nachhilfe.s1910456002.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  //Error Handler
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }


  getSingleUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/users/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

}
