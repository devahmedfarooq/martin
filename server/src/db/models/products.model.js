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
        type: [{
            img: {
                type: String,
                default: ""
            },
            prompt: {
                type: String,
                default: ""
            },
            size: {
                type: String,
                default: ""
            },
        }],
        default: []
    },
    user: {
        type: String,
        required: true
    },
    legal_policies: {
        type: [String],
        default: [""]
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
