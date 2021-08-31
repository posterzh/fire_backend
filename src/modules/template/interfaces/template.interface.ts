import { ISection } from "../../report/interfaces/report.interface";
import { Document } from "mongoose";

export interface ITemplate extends Document {
  name: string;
  sections: ISection[]
}
