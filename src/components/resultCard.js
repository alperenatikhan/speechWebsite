import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import indexStyles from '@/styles/index.module.css'
import {useState,useEffect} from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function ResultCard ({item}) {
    const [displayExtended, setDisplayExtended] = useState(false)

const handleTest = async(context, title)=>{

console.log(title, context)
}

return(
    <div className={indexStyles.textCard} style={{"padding":"1em", "margin": "0.5em", 'display':'grid', 'placeItems':'center'}}> <p className= {inter.className}style={{'width':'90%'}}> {!displayExtended ? item?.context.slice(100,item?.context.length-100) : item?.context} </p> <div style={{width: "60%","display":'flex', "flexDirection":'row', justifyContent:'space-around', margin:"10px"}}> <button className={indexStyles.textCardButton} onClick={ () => setDisplayExtended(!displayExtended)}> {!displayExtended ? 'Extend' : 'Shorten'}</button> <button className={indexStyles.textCardButton}  onClick ={()=> handleTest( item.context, data.filename)}> Add to Favourites </button> </div> </div>
)


}