import {Comment} from '../../../models/Comment';
import {WholeComment} from '../../../models/WholeComment';
import mongoose from 'mongoose';

export default async function handler(req, res) {

const {commentId} = req.body;

const comment = await Comment.findOneAndUpdate(
    { "comments._id": commentId },
    { $pull: { comments: { _id: commentId } } },
    { new: true }
  );
  if (!comment) {
    return res.status(404).json({ message: "Comment not found." });
  }

  return res.status(200).json({ message: "Comment deleted.", comment });

}