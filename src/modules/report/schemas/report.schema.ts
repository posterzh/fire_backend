import * as mongoose from 'mongoose';
import * as slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

export const ReportSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
	    unique: true
    },
    slug: {
        type: String,
        unique: true,
	    slug: "name"
    },
    icon: String,
    rating: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating',
    }
},{ 
	collection: 'reports',
	versionKey: false, 
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, 
});

// create index search
ReportSchema.index({
    name: 'text', slug: 'text', icon: 'text'
});
