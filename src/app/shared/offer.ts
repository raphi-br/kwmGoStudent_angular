import {Time} from "@angular/common";
import {Appointment} from "./appointment";
import {Comment} from "./comment";

export class Offer {
  constructor(public id: number,
              public title: string,
              public description: string,
              public subject:string,
              public user_id:number,
              public appointments?:Appointment[],
              public comments?:Comment[]) {

  }
}
