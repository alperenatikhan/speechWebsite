/*Todo

 searchKeyword,
 slug,
 pagetitle,
 source,
 excerptText,
 commentText,

 should be passed under the component. in this way we can post a comment 
*/

import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import indexStyles from '@/styles/index.module.css'
import {useState,useEffect} from 'react'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function ResultCard ({item,source, data, searchKeyword}) {
    const [displayExtended, setDisplayExtended] = useState(false)
    const [displayCommentBox, setDisplayCommentBox] = useState(false)
    const [comment, setComment] = useState("")
    const [commentStatus, setCommentStatus] = useState("")

const handleAddFavorites = async(source)=>{
console.log(source)
}

const handleComment = async(event) => {

  event.preventDefault()

let commentData = {
 searchKeyword : searchKeyword,
 slug: data?.slug,
 pagetitle: data?.pagetitle,
 source: data?.source,
 excerptText: item.context,
 commentText:comment.length > 0 ? comment : '',
}

console.log(commentData)

const options = {
  // The method is POST because we are sending data.
  method: 'POST',
  // Tell the server we're sending JSON.
  headers: {
    'Content-Type': 'application/json',
  },
  // Body of the request is the JSON data we created above.
  body: JSON.stringify(commentData),
}


await fetch('/api/postcomment', options).then(res =>{setCommentStatus('success'); setDisplayCommentBox(false); setComment(''); setTimeout(() => setCommentStatus(false),2000 );setTimeout(() => setDisplayExtended(false),2000 ) }).catch(err => setCommentStatus(`failed ${err}`))

}

return(
    <div className={indexStyles.textCard} style={{"padding":"1em", "margin": "0.5em", 'display':'grid', 'placeItems':'center'}}> 
    <p className= {inter.className}style={{'width':'90%'}}> {!displayExtended ? item?.context.slice(100,item?.context.length-100) : item?.context} </p> 
   {displayExtended ? <h5 className= {inter.className}style={{'width':'80%', margin:'0.5em 0'}}> {source} </h5> : null}
            <div style={{width: "60%","display":'flex', "flexDirection":'row', justifyContent:'space-around', margin:"10px"}}> 
            <button className={indexStyles.textCardButton} onClick={ () => setDisplayExtended(!displayExtended)}> {!displayExtended ? 'Extend' : 'Shorten'}</button> 
            <button className={indexStyles.textCardButton}  onClick ={(event)=> handleComment(event)}> Add to Favourites </button> 
  
            <button className={indexStyles.textCardButton} disabled={displayCommentBox} onClick ={()=>setDisplayCommentBox(true) }> Comments </button> 
            </div>
{
displayCommentBox &&
<div style={{margin:'1em'}}>
<form onSubmit={(event) => handleComment(event)}>

<textarea rows={5} cols={40} 
  style={{boxSizing: "border-box", width: "100%",height: "200px", 
  padding: "10px",
  fontSize: "14px",
  border: "1px solid #ccc"}}
  value = {comment}
  onChange ={(el) => setComment(el.target.value) }
  name= "comment"
  required
  />

<div style={{margin:'0.5em', display: 'flex', justifyContent:'space-evenly'}}>
<button className= {indexStyles.textCardButton}  type='submit'> Submit </button>
<button style={{backgroundColor:'white', color:'dodgerblue'}} className= {indexStyles.textCardButton} onClick={()=> setDisplayCommentBox(false)}> Cancel</button>
</div>

</form>
</div>
}
    {(commentStatus.length >0) && <p> {commentStatus} </p>}        
     </div>
)


}