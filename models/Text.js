import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("database connected");
});

const textSchema = new mongoose.Schema({
  _id: String,
  pagetitle: String,
  rawDateObject: String,
  slug: String,
  sortableDate: Number,
  source: String,
  year: Number,
  filename: String,
  pagecontent: String,
});

export const Text =  mongoose.models.newspeechtexts || mongoose.model('newspeechtexts', textSchema);

