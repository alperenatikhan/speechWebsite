import { useRouter } from 'next/router';
import axios from 'axios';


export default function Speeches({data}){

  const router = useRouter();
  const { slug } = router.query;

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {data.pageData?.map(item=> <div style={{width: '90%', minWidth:'250px',maxWidth:"600px" ,margin:'100px auto', padding:'2em', border:'1px solid lightgray'  }}><pre style={{display:'block',whiteSpace: "pre", fontFamily:'sans-serif', lineHeight: '1.5em', overflowX:"auto", whiteSpace: "pre-wrap",
  wordWrap: "break-word", textAlign:'justify' }}> {item.pagecontent} </pre> </div> )}
    </>
  );
}




export async function getServerSideProps({params}) {
 
  const { slug } = params
  const data = await axios.get(`http://localhost:3000/api/speeches/${slug}`).then(data=> data.data)
  

  // Pass data to the page via props
  return {props: { data }} 

}
