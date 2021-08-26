import { Document } from 'mongoose';

export interface IInspection extends Document {
     name: string; // Unique
     slug: string;
     category: string;
     template: any;
     reports: [any]
}
