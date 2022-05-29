import {Time} from "@angular/common";

export class Comment {
  constructor(public id: number, public title: string, public commenttext: string, public user_id:number, public offer_id:number) {

  }
}
