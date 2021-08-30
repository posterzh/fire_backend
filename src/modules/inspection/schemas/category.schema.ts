import * as mongoose from "mongoose";
import * as slug from "mongoose-slug-updater";

mongoose.plugin(slug);

export const CategorySchema = new mongoose.Schema({
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
  description: String,
  image: String,
}, {
  collection: "categories",
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

