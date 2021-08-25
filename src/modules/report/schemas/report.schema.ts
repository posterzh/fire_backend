import * as mongoose from "mongoose";
import * as slug from "mongoose-slug-updater";
import { QuestionType } from "../interfaces/report.interface";

mongoose.plugin(slug);

export const QuestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
  },
  type: {
    type: QuestionType,
  },
  answer: {
    type: String,
  },
  deficiencyCode: {
    type: String,
  },
  customCode: {
    type: String,
  },
  label1: {
    type: String,
  },
  text1: {
    type: String,
  },
  label2: {
    type: String,
  },
  text2: {
    type: String,
  },
  label3: {
    type: String,
  },
  text3: {
    type: String,
  },
  tooltip: {
    type: String,
  },
  has_exception: {
    type: Boolean,
  },
  exception: {
    type: String,
  },
}, {
  collection: "questions",
  versionKey: false,
  timestamps: { createdAt: false, updatedAt: false },
})

export const SectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
  },
  reference: {
    type: String,
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }]
}, {
  collection: "sections",
  versionKey: false,
  timestamps: { createdAt: false, updatedAt: false },
})


export const ReportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
    slug: "name",
  },
  inspection: {
    type: String,
  },
  sections: {
    type: String
  },
  wrote_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  collection: "reports",
  versionKey: false,
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});

// create index search
ReportSchema.index({
  name: "text", slug: "text",
});
