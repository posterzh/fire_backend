import { Document } from 'mongoose';

export interface IThanks extends Document {
     video: string;
     title: string;
     description: string;
}

export interface IModule extends Document {
     statement: [{ value: string }]; //statement
     question: [{ value: string, answers: [{ answer: String, user: String, datetime: Date }] }];
     mission: [{ value: string, completed: [{ user: String, datetime: Date }] }];
     mind_map: [{ value: string }];
}

export interface IPost extends Document {
     topic: string;
     title: string;
     desc: string;
     images: string;
     post_type: string;
     placement: string;
     podcast: { url: string };
     video: string;
     webinar: string;
     author: string
}

export interface IFulfillment extends Document {
     isBlog: boolean; // type
     product: string;
     module : IModule;
     thanks: IThanks;
     goal: string;
     post: IPost[]
}