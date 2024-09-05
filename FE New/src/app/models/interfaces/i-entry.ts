import { Payment } from "../../enums/payment";
import { Status } from "../../enums/status";
import { IAnswer } from "./i-Answer";

export interface IEntry {
    idEntry: number;
    entryDate: Date;
    expiryDate: Date;
    active: boolean;
    status: Status;
    payment: Payment;
    answers: IAnswer[];
  }