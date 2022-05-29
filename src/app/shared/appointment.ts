import {Time} from "@angular/common";

export class Appointment {
  constructor(public id: number, public date: string, public time: string, public offer_id:number, public user_id?:number) {

  }
}
