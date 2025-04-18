import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
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
            name : {
                type : String,
                default : ""
            }
        }],
        default: []
    },
    user: {
        type: String,
        default: ""
    },


}, {
    timestamps: true,
});

const Data = mongoose.model('ImageData', dataSchema);

export default Data;
