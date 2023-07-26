const mongoose = require('mongoose');
const Review=require('./review')
const User=require('./user')
const Schema = mongoose.Schema;
const HotelSchema=new Schema({
    title:String,
    location:String,
    images:[
        {
            url: String,
            filename: String
        }
    ],
    price:Number,
    description:String,
    author:
        {type:Schema.Types.ObjectId,
        ref:'User'
        }
    ,
    reviews:[
        {type:Schema.Types.ObjectId,
        ref:'Review'
        }
    ],
    
});

HotelSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})
module.exports=mongoose.model('Hotel',HotelSchema);