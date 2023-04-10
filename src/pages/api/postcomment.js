import {Comment} from '../../../models/Comment';
import {WholeComment} from '../../../models/WholeComment';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  const { slug, pagetitle, source, excerptText, commentText, searchKeyword } = req.body;

  const addComment = async (searchKeyword, wholeComment) => {
    const comment = await Comment.findOne({ searchKeyword }).exec();

    if (comment) {
      comment.comments.push(new WholeComment(wholeComment));
      await comment.save();
    } else {
      const newComment = new Comment({
        searchKeyword,
        pagetitle,
        source,
        comments: [new WholeComment(wholeComment)],
      });
      await newComment.save();
    }
  };

  try {
    await addComment(searchKeyword, { slug, pagetitle, source, excerptText, commentText });
    res.status(200).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
