import {Comment} from '../../../models/Comment';
import mongoose from 'mongoose';


export default async function handler(req, res) {

let allComments = await Comment.find({})

res.status(200).json(allComments)

}