import * as mongoose from "mongoose";
import * as slug from "mongoose-slug-updater";
import { InspectionCategory } from "../dto/inspection.dto";

mongoose.plugin(slug);

export const InspectionSchema = new mongoose.Schema({
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
  category: {
    type: String,
    enum: InspectionCategory,
    required: true,
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
  },
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report',
    default: []
  }]
}, {
  collection: "inspections",
  versionKey: false,
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});

// create index search
InspectionSchema.index({
  name: "text", slug: "text", icon: "text",
});
