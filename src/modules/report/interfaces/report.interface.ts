import { Document } from "mongoose";
import { IUser } from "../../user/interfaces/user.interface";
import { IInspection } from "../../inspection/interfaces/inspection.interface";

export enum QuestionType {
     HEAD = 'HEAD',
     DESCRIPTION = 'DESCRIPTION',
     TEXT = 'TEXT',
     CHECK = 'CHECK',
     TABLE = 'TABLE',
     DROP = 'DROP',
     MULTILINE = 'MULTILINE',
     EMPTY_CHECK = 'EMPTY_CHECK',
}

export interface IQuestion extends Document {
     name: string;
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
     description: string,
     inspection: IInspection,
     sections: ISection[]
     wrote_by: IUser
}
