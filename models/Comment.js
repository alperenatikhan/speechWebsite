import mongoose from 'mongoose';
import {WholeComment} from './WholeComment'

  mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("database connected"));
  
  const commentSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    searchKeyword: String,
    comments: { type: [WholeComment.schema], default: [] }
   
  });
  
  export const Comment =  mongoose.models.comments || mongoose.model('comments', commentSchema);