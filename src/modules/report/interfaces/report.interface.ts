import { Document } from "mongoose";
import { IUser } from "../../user/interfaces/user.interface";

export enum QuestionType {
     HEAD = 'HEAD',
     DESCRIPTION = 'DESCRIPTION',
     TEXT = 'TEXT',
     CHECK = 'CHECK',
     TABLE = 'TABLE',
     DROP = 'DROP'
}

export interface IQuestion extends Document {
     name: string;
     order: number;
     type: string;
     answer: string,
     deficiencyCode: string,
     customCode: string,
     label1: string,
     text1: string,
     label2: string,
     text2: string,
     label3: string,
     text3: string,
     tooltip: string,
     has_exception: boolean,
     exception: string,
}

export interface ISection extends Document {
     name: string;
     order: number;
     reference: string;
     questions: IQuestion[]
}

export interface IReport extends Document {
     name: string;
     sections: ISection[]
     wrote_by: IUser
}
