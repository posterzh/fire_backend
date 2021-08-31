import * as mongoose from "mongoose";
import { SectionSchema } from "../../report/schemas/report.schema";

export const TemplateSchema = new mongoose.Schema({
  name: String,
  sections: [SectionSchema],
}, {
  collection: "templates",
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
TemplateSchema.index({
  name: "text", slug: "text",
});
