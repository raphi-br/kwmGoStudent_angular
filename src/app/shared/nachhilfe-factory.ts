import {Offer} from "./offer";

export class NachhilfeFactory {

  static empty(): Offer{
    return new Offer (0, '', '', '', 0, '',
      [{id: 0, date: '', time: '', offer_id: 0, user_id: 0 }],
      [{ id: 0, created_at:'', title: '', commenttext: '', user_id:0, offer_id:0}])
  }

  static fromObject(rawOffer: any): Offer{
    return new Offer(
      rawOffer.id,
      rawOffer.title,
      rawOffer.description,
      rawOffer.subject,
      rawOffer.user_id,
      rawOffer.created_at,
      rawOffer.appointments,
      rawOffer.comments
    )
  }
}
