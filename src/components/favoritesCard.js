/*Todo

 searchKeyword,
 slug,
 pagetitle,
 source,
 excerptText,
 commentText,

 should be passed under the component. in this way we can post a comment 


 also I need to make some edits for adding delete and update functionality
*/


import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import indexStyles from '@/styles/index.module.css'
import Link from 'next/link'
import {useState} from 'react'
import axios from 'axios'
const inter = Inter({ subsets: ['latin'] })




export default function FavoritesCard ({data}) {


  let [displayCommentBox ,setDisplayCommentBox] =  useState(false)
  let [chosenCommentId, setChosenCommentId] = useState('')

  const handleAddComment = async (event) => {
    
    event.preventDefault();
  
    const commentTextToSend = event.target.commentText.value;
  
    const commentData = {
      commentId: chosenCommentId,
      newCommentText: commentTextToSend,
    };
  
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    };
  
    console.log(options)
await fetch('/api/updatecomment', options).then(res=> {console.log(res); setDisplayCommentBox(false)}).catch(err=> console.log(err))

  };




return ( 


<> 
<div className={indexStyles.outerCard} style={{
          maxWidth: '700px',
          minWidth: '250px',
          width: '95vw',
          margin: '0 auto',
        }}>
<h3 className={inter.className}> {data.searchKeyword} </h3> 


{data.comments?.sort((a, b) => {
  const aComment = a.comments?.reduce((acc, comment) => {
    return comment.commentDate > acc.commentDate ? comment : acc;
  }, a.comments[0]);
  const bComment = b.comments?.reduce((acc, comment) => {
    return comment.commentDate > acc.commentDate ? comment : acc;
  }, b.comments[0]);
  if (!aComment && !bComment) {
    return 0;
  } else if (!aComment) {
    return 1;
  } else if (!bComment) {
    return -1;
  } else {
    return bComment.commentDate - aComment.commentDate;
  }
}).map((comment, index )=> 
    <div key={index} className={indexStyles.textCard} style={{width:"95%", padding:'1.2em'}}> 
    
 
{comment.commentText.length > 0 ? 
(<>

<Link href={`/speeches/${comment.slug}`}> <h4 className={inter.className}> {comment.pagetitle}</h4> </Link>
<div className={indexStyles.textCard} style={{backgroundColor:'lightblue'}}>
  <p> Comment: {comment.commentText} </p>
  </div>
  </>
  )
  
   : 

(<> 
<div style={{margin:'0.5em', display: 'flex', flexDirection: "column", alignItems:"center"}}>
<Link href={`/speeches/${comment.slug}`}> <h4 className={inter.className}> {comment.pagetitle}</h4> </Link>
<p> No comments added yet! Would you like to add a comment? </p>
<button className= {indexStyles.textCardButton}  onClick={() => setDisplayCommentBox(!displayCommentBox)}> Add Comment </button>
</div>
{displayCommentBox &&
(<form onSubmit = {(event) => handleAddComment(event)}>
<textarea rows={5} cols={40} style={{boxSizing: "border-box", width: "100%",height: "200px", 
  padding: "10px",
  fontSize: "14px",
  border: "1px solid #ccc"}}
  name= "commentText"
  
  />

<div style={{margin:'0.5em', display: 'flex', justifyContent:'space-evenly'}}>
<button className= {indexStyles.textCardButton} onClick={() => setChosenCommentId(comment._id)} type='submit'> Submit </button>
<button style={{backgroundColor:'white', color:'dodgerblue'}} className= {indexStyles.textCardButton} onClick={()=> setDisplayCommentBox(false)}> Cancel</button>
</div>
</form>)
}
 </>)

   }





<p style={{fontStyle: "italic"}}> Excerpt: {comment.excerptText} </p>
<>
<a href= {data.slug}><p>{data.pagetitle}</p> </a>
   <p style={{ 
  overflow: "hidden",
  textOverflow: "ellipsis"
}}>Source: {comment.source}</p>
   </>
    


    </div>
    
    )}

</div>
</>
)



}