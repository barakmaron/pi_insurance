import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../../components/NavBar/NavBar';
import Constants from '../../../Constants';
import { supabaseAdmin } from '../../../services/ApiService';
import ArticleBody from '../../../components/ArticleBody/ArticleBody';
import EmailFromModal from '../../../components/EmailFromModal/EmailFromModal';
import Footer from '../../../components/Footer/Footer';
import { useRouter } from 'next/router';
import blogsDB from '../../../services/db/blogs';

const Blog = ({ article }) => {
    const router = useRouter();
    const [show_email_form, setShowEmailForm] = useState(false);

    return (<>
        <Head>
            <title>PI insurance | Blog | { !router.isFallback ? article.title : "Loading" }</title>
            <meta name="description" content="PI insurance" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    
        { !router.isFallback ? <main>
            <Navbar 
            routes={Constants.routes}
            open_modal={() => setShowEmailForm(true)} />
            <div className='flex sm:flex-row flex-col py-28 gap-10 justify-around sm:px-12 text-white bg-teal-500 px-2'>
                <h1 className='sm:text-5xl font-bold text-3xl'>{article.title}</h1>           
            </div>
            <div className='flex sm:w-9/12 mx-auto py-10 px-0 flex-col gap-5 sm:px-12'>
                <div className="bg-gray-200 rounded-lg overflow-hidden w-full relative h-96">
                    <Image
                    alt={article.title}
                    src={article.image}
                    layout="fill"
                    objectFit="contain"/>    
                </div>    
                <article className='mx-auto py-10 px-12'>
                    <ArticleBody 
                    body={article.body}
                    onClick={() => setShowEmailForm(true)}></ArticleBody>
                </article>
            </div>
            <EmailFromModal show={show_email_form} setShow={setShowEmailForm} />
        </main> : <div>Loading...</div>};
        <Footer></Footer>
    </>);
    };
export default Blog;

export async function getStaticProps(context) {
    const { id } = context.params;
    const {error, data: articles} = await blogsDB.GetBlogById(id);
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
    const {error, data: articles} = await blogsDB.GetAll();
    const ids = error ? [] : articles.map(article => article.id);
    const paths = ids.map(id => ({ 
        params: { 
            id: id
    }}));

    return {
        paths,
        fallback: true,
    };
};