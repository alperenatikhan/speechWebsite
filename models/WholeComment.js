import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("database connected"));

const wholeCommentSchema = new mongoose.Schema({
  slug: String,
  pagetitle: String,
  source: String,
  excerptText: String,
  commentText: String,
  commentDate: { type: Number, default: Date.now() },
  updatedAt: { type: Number, default: Date.now() },
  user: { type: String, default: 'testUser' }
});


export const WholeComment =  mongoose.models.wholeComments || mongoose.model('wholeComments', wholeCommentSchema);
