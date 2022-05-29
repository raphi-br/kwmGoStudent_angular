export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string )  {

  }

}

export const OfferFormErrorMessages= [ new ErrorMessage('title','required','Ein Titel muss angegeben werden'),
  new ErrorMessage('subject','required','Es muss ein Fach angegeben werden'),
  new ErrorMessage('authors','required','Es mussein Autor angegeben werden')];
