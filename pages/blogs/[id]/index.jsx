import Head from 'next/head';
import Navbar from '../../../components/NavBar/NavBar';
import Constants from '../../../Constants';
import SendApiRequest from '../../../services/ApiService';

const Blog = ({ article }) => {

    return (<>
        <Head>
            <title>PI insurance | Blog | {article.title}</title>
            <meta name="description" content="PI insurance" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    
        <main>
            <Navbar 
            routes={Constants.routes} />
            <div className='flex sm:flex-row flex-col py-28 gap-10 justify-around px-12 text-white bg-teal-500'>
                <h1 className='sm:text-5xl font-bold text-3xl'>{article.title}</h1>           
            </div>
            <article className='mx-auto sm:w-9/12 py-10 px-12' dangerouslySetInnerHTML={{ __html: article.body }}>
            </article>
        </main>
    </>);
    };
export default Blog;

export async function getStaticProps(context) {
    const { id } = context.params;
    const article = await SendApiRequest(`/api/articles/${id}`);

    return {
        props: {
            article: article
        }
    };
}

export async function getStaticPaths() {
    const articles = await SendApiRequest(`/api/articles`);

    const ids = articles.map(article => article.id);
    const paths = ids.map(id => ({ 
        params: { 
            id: id
    }}));

    return {
        paths,
        fallback: false
    };
};