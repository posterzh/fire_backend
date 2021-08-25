import { Document } from 'mongoose';

export interface IReport extends Document {
     name: string; // Unique
     slug: string;
     icon: string;
     rating: string;
}
