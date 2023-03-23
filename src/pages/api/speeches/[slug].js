import {Text} from '../../../../models/Text.js'

export default async function handler(req,res){

    const {slug} = req.query

    try{
    let pageData = await Text.find({slug : slug})

    res.status(201).json({pageData})
    }catch(err){
   res.status(403).json({err})

    }
}