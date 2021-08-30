import { Document } from 'mongoose';
import { ICategory } from "./category.interface";

export interface IInspection extends Document {
     name: string; // Unique
     slug: string;
     category: ICategory;
     template: any;
}
