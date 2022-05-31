
export class Comment {
  constructor(public id: number,
              public created_at: string,
              public title: string,
              public commenttext: string,
              public user_id:number,
              public offer_id:number) {

  }
}
