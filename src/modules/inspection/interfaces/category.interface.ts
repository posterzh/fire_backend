import { Document } from 'mongoose';

export interface ICategory extends Document {
     name: string; // Unique
     slug: string;
     description: string;
     image: string;
}
