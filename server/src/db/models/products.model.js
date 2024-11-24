import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    title: {
        type: [String],
        default: []
    },
    overview: {
        type: [String],
        default: []
    },
    description: {
        type: [String],
        default: []
    },
    marketing_angles: {
        type: [String],
        default: []
    },
    reviews: {
        type: [String],
        default: []
    },
    faqs: {
        type: [String],
        default: []
    },
    after_sale: {
        type: [String],
        default: []
    },
    successful: {
        type: [String],
        default: []
    },
    influencer: {
        type: [String],
        default: []
    },
    email: {
        type: [String],
        default: []
    },
    images: {
        type: [String],
        default: [""]
    },
    user: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    productTitle: {
        type: String,
        default: ""
    },
    productDescription: {
        type: String,
        default: ""
    }
}, {
    timestamps: true,
});

const Data = mongoose.model('Data', dataSchema);

export default Data;
