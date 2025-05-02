import mongoose, {Schema} from 'mongoose';

const videoSchema = new mongoose.Schema(
    {
        videoFile:{
            type:String, //cloudinary url
            required:true,
        },
        thumbnail:{
            type:String, //cloudinary url
            required:true,
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref:"User",
        },
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        duration:{
            type:Number,
            required:true,
        },
    }
)

export const Video = mongoose.model("Video", videoSchema);