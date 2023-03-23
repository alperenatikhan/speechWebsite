import fs from 'fs';
import path from 'path';

function Speech({ page }) {
  return (
    <div style={{width: '90%', minWidth:'250px',maxWidth:"600px" ,margin:'100px auto', padding:'2em', border:'1px solid lightgray'  }}> <pre style={{display:'block',whiteSpace: "pre", fontFamily:'sans-serif', lineHeight: '1.5em', overflowX:"auto", whiteSpace: "pre-wrap",
    wordWrap: "break-word", textAlign:'justify' }}>{page.pagecontent}</pre> </div>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), '/', 'correctedDataBase14.json');
  const rawData = fs.readFileSync(filePath);
  const pageData = JSON.parse(rawData);

  const paths = pageData.map((data) => ({
    params: { slug: data.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), '/', 'correctedDataBase14.json');
  const rawData = fs.readFileSync(filePath);
  const pageData = JSON.parse(rawData);

  const page = pageData.find((data) => data.slug === params.slug);

  return { props: { page } };
}

export default Speech;
