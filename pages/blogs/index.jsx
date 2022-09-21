import Head from 'next/head';
import Navbar from '../../components/NavBar/NavBar';
import Constants from '../../Constants';
import Link from 'next/link';
import { supabaseAdmin } from '../../services/ApiService';

const blogs = ({ articles }) => {
  return (<>
   <Head>
        <title>PI insurance | Blogs</title>
        <meta name="description" content="PI insurance" />
        <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
        <Navbar 
        routes={Constants.routes} />
        <div className='flex sm:flex-row flex-col py-28 gap-10 justify-around px-12 text-white bg-teal-500'>
          <h1 className='sm:text-6xl font-bold text-3xl'>Our Blog</h1>
          <p className='sm:w-96'>
          Where Instagram creators come to learn the latest tips and tricks about growing their business, protecting it from hackers, and more
          </p>
        </div>
        <ul className='w-9/12 mx-auto py-10 '>
          {articles.map(article => {
            return <Link key={`article-${article.id}`} className=' cursor-pointer' href={`/blogs/${article.id}`}>
              <li className='my-10' >                
                  <h2 className=' cursor-pointer text-2xl font-bold text-teal-500'>{article.title}</h2>     
                <div className='flex flex-row gap-6 items-baseline'>
                  <div className='mx-2 my-4 bg-blue-500 px-4 py-2 w-fit text-white rounded-3xl'>{article.hash_tag}</div>
                  <div className='text-sm text-gray-600'>{article.created_at.slice(0,10)}</div>
                </div>
              </li>
                       
            </Link>;
          })}
        </ul>
    </main>
  </>);
};

export default blogs;


export async function getStaticProps() {
  const {error, data: articles} = await supabaseAdmin.from('blogs').select();
    if(!error)
      return {
        props: {
          articles: articles
        }
      };

    return {
      props: {
        articles: []
      }
    };  
};