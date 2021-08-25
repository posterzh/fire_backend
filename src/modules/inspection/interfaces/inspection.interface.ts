import { Document } from 'mongoose';

export interface IInspection extends Document {
     name: string; // Unique
     slug: string;
     icon: string;
     rating: string;
}
