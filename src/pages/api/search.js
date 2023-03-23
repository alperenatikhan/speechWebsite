
//mongoose.connect('', {
import mongoose from 'mongoose';
import escapeStringRegexp from 'escape-string-regexp';
import {Text} from '../../../models/Text.js' 
  
  async function searchKeyword(keyword) {



// Create the regex pattern
const regex = new RegExp(`${keyword}`, 'gi');

    console.log('regex', regex)
    const texts = await Text.find({ pagecontent: regex });
  
    const results = texts.map((text) => {
      const contextArray = [];
      const pageContent = text.pagecontent;
      let startIndex = 0;
  
      while (true) {
        const matchIndex = pageContent.substring(startIndex).search(regex);
        if (matchIndex === -1) break;
  
        const matchStartIndex = startIndex + matchIndex;
        const matchEndIndex = matchStartIndex + keyword.length;
        const contextStartIndex = Math.max(matchStartIndex - 250, 0);
        const contextEndIndex = Math.min(matchEndIndex + 250, pageContent.length);
        const context = pageContent.substring(contextStartIndex, contextEndIndex);
  
        contextArray.push({
          context: context,
          matchIndex: matchStartIndex,
        });
  
        startIndex = matchEndIndex;
      }
  
      return {
        filename: text.filename,
        slug:text.slug,
        source: text.source,
        pagetitle:text.pagetitle,
        year:text.year,
        sortableDate: text.sortableDate,
        rawDateObject: text.rawDateObject,
        contexts: contextArray,
      };
    });
  
    return results;
  }

  export default async function handler(req, res) {

    var Deasciifier = require("turkish-deasciifier");

var deascii = new Deasciifier();

let {q} = req.query
let keyword = deascii.deasciify(q)
console.log("keyword", keyword)

try {

let results = await searchKeyword(keyword)
res.status(201).json({results})


}catch(err){

res.status(403).json({msg:err})

}


  }
