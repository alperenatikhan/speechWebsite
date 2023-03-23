import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import indexStyles from '@/styles/index.module.css'
import {useState,useEffect} from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function ResultCard ({item,source}) {
    const [displayExtended, setDisplayExtended] = useState(false)
    const [displayCommentBox, setDisplayCommentBox] = useState(false)

const handleTest = async(context, title)=>{
console.log(title, context)
}

const handleComment = async() => {

   null 
}

return(
    <div className={indexStyles.textCard} style={{"padding":"1em", "margin": "0.5em", 'display':'grid', 'placeItems':'center'}}> 
    <p className= {inter.className}style={{'width':'90%'}}> {!displayExtended ? item?.context.slice(100,item?.context.length-100) : item?.context} </p> 
   {displayExtended ? <h5 className= {inter.className}style={{'width':'80%', margin:'0.5em 0'}}> {source} </h5> : null}
            <div style={{width: "60%","display":'flex', "flexDirection":'row', justifyContent:'space-around', margin:"10px"}}> 
            <button className={indexStyles.textCardButton} onClick={ () => setDisplayExtended(!displayExtended)}> {!displayExtended ? 'Extend' : 'Shorten'}</button> 
            <button className={indexStyles.textCardButton}  onClick ={()=> handleTest( item.context, data.filename)}> Add to Favourites </button> 
  
            <button className={indexStyles.textCardButton} disabled={displayCommentBox} onClick ={()=>setDisplayCommentBox(true) }> Comments </button> 
            </div>
{
displayCommentBox &&
<div style={{margin:'1em'}}>
<form>

<textarea rows={5} cols={40} style={{boxSizing: "border-box", width: "100%",height: "200px", 
  padding: "10px",
  fontSize: "14px",
  border: "1px solid #ccc"}}/>

<div style={{margin:'0.5em', display: 'flex', justifyContent:'space-evenly'}}>
<button className= {indexStyles.textCardButton}  type='submit'> Submit </button>
<button style={{backgroundColor:'white', color:'dodgerblue'}} className= {indexStyles.textCardButton} onClick={()=> setDisplayCommentBox(false)}> Cancel</button>
</div>

</form>
</div>
}
            
     </div>
)


}