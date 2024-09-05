import { IAnswer } from "./i-Answer";
import { IEntry } from "./i-entry";

export interface PlaceEntryRequest {
    idUser: number;
    entry: IEntry;
    answer: IAnswer;
  }