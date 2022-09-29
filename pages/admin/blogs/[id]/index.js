import Head from 'next/head';
import Navbar from '../../../../components/NavBar/NavBar';
import Constants from '../../../../Constants';
import SendApiRequest from '../../../../services/ApiService';
import { useCallback, useEffect, useState } from 'react';
import useView from '../../../../Hooks/useView';
import View from '../../../../components/View/View';
import { supabaseAdmin } from '../../../../services/ApiService';
import ArticleEditor from '../../../../components/ArticleEditor/ArticleEditor';
import { useRouter } from 'next/router';

const AdminEditBlog = ({ article }) => {
    const [value, setValue] = useState('');
    const router = useRouter();

    const view = useView();
    useEffect(() => {    
        if(!router.isFallback)
            setValue(article.body);
    }, [router.isFallback, article]);

    

    const submit_article = useCallback(() => {
        if(!router.isFallback)  {
            const submit = async () => {
                try {
                    const set_article = await SendApiRequest(`/api/articles/${article.id}`, Constants.API_METHODS.PATCH, {
                        body: value
                    });
                    view.setSuccessful(true);
                    view.setMessage(Constants.user_messages.article_saved);
                } catch (err) {
                    view.setFailed(true);
                    view.setMessage(err.message);
                }
            };
            submit();
        }
    }, [router, value, article, view]);

    return (<>
        <Head>
            <title>PI insurance | Blog | { !router.isFallback ? article.title : "Loading" }</title>
            <meta name="description" content="PI insurance" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    
        { !router.isFallback ? <main className='h-screen'>
            <Navbar 
            routes={Constants.admin_routes} />
            <div className='flex sm:flex-row flex-col py-28 gap-10 justify-around px-12 text-white bg-teal-500'>
                <h1 className='sm:text-5xl font-bold text-3xl'>{article.title}</h1>           
            </div>
            <div className=' flex flex-col gap-15 mx-auto sm:w-9/12 py-10 px-12 h-4/6'>
                <View successful={view.successful} failed={view.failed} message={view.message} />
                <div>
                    <ArticleEditor
                    value={value}
                    setValue={setValue}></ArticleEditor>
                </div>
                <button 
                onClick={submit_article}
                className="my-10 mx-auto font-bold py-2 px-4 rounded hover:text-white hover:bg-blue-500 hover:border-white border-2 border-black text-blue-500 bg-white">
              save
            </button>
            </div> 
        </main> : <div>Loading...</div>};
    </>);
    };
export default AdminEditBlog;  

export async function getStaticProps(context) {
    const { id } = context.params;
    const {error, data: articles} = await supabaseAdmin.from('blogs').select();
    if(!error) {
        const filtered = articles.find((article) => article.id === id);
        const article = filtered;
        return article ? {
            props: {
                article: article
            },
            revalidate: 10,
        } : { notFound: true };
    }
    
    return { notFound: true };
}

export async function getStaticPaths() {
    const {error, data: articles} = await supabaseAdmin.from('blogs').select() || { data: [] };
    const ids = articles.map(article => article.id);
    const paths = ids.map(id => ({ 
        params: { 
            id: id
    }}));

    return {
        paths,
        fallback: true
    };
};