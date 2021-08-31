import * as mongoose from "mongoose";
import * as slug from "mongoose-slug-updater";
import { QuestionType } from "../interfaces/report.interface";

mongoose.plugin(slug);

export const QuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: QuestionType
  },
  question: String,
  answer: String,
  deficiencyCode: String,
  customCode: String,
  label1: String,
  text1: String,
  label2: String,
  text2: String,
  label3: String,
  text3: String,
  tooltip: String,
  has_exception: Boolean,
  exception: String,
}, {
  collection: "questions",
  versionKey: false,
  timestamps: { createdAt: false, updatedAt: false },
  toObject: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
})

export const SectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  reference: String,
  questions: [QuestionSchema]
}, {
  collection: "sections",
  versionKey: false,
  timestamps: { createdAt: false, updatedAt: false },
  toObject: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
})


export const ReportSchema = new mongoose.Schema({
  name: String,
  description: String,
  inspection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inspection',
  },
  sections: [SectionSchema],
  wrote_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  collection: "reports",
  versionKey: false,
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  toObject: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

// create index search
ReportSchema.index({
  name: "text", slug: "text",
});
