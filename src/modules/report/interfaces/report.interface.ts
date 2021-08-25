import { Document } from "mongoose";

export enum QuestionType {
     HEAD = 'HEAD',
     DESCRIPTION = 'DESCRIPTION',
     TEXT = 'TEXT',
     CHECK = 'CHECK',
     TABLE = 'TABLE',
     DROP = 'DROP'
}

export interface IQuestion extends Document {
     name: string; // Unique
     slug: string;
}

export interface ISection extends Document {
     name: string; // Unique
     slug: string;
}

export interface IReport extends Document {
     name: string; // Unique
     slug: string;
}
