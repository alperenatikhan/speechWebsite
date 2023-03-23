import mongoose from 'mongoose';




  mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("database connected"));
  
  const commentSchema = new mongoose.Schema({
    _id: String,
    slug: String,
    pagetitle: String,
    source: String,
    excerptText: String,
    commentText:String,
    commentDate:{type:Number,default: Date.now()}
    user:{type:String, default: 'testUser'}
   
  });
  
  const Comment = mongoose.model('comments', commentSchema);

export default Comment;
