import * as mongoose from "mongoose";
import { SectionSchema } from "../../report/schemas/report.schema";

export const TemplateSchema = new mongoose.Schema({
  name: String,
  sections: [SectionSchema],
}, {
  collection: "templates",
  versionKey: false,
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});

// create index search
TemplateSchema.index({
  name: "text", slug: "text",
});
