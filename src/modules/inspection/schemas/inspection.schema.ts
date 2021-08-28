import * as mongoose from "mongoose";
import * as slug from "mongoose-slug-updater";

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
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
InspectionSchema.index({
  name: "text", slug: "text",
});
