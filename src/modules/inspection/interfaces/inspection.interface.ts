import { Document } from 'mongoose';
import { ICategory } from "./category.interface";
import { ITemplate } from "../../template/interfaces/template.interface";

export interface IInspection extends Document {
     name: string; // Unique
     slug: string;
     category: ICategory;
     template: ITemplate;
}
