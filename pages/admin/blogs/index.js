import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '../../../Hooks/useAppContext';
import Head from 'next/head';
import Navbar from '../../../components/NavBar/NavBar';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import Constants from '../../../Constants';
import SendApiRequest from '../../../services/ApiService';
import Link from 'next/link';
import Modal from '../../../components/Modal/Modal';
import Form from '../../../components/Form/Form';
import useView from '../../../Hooks/useView';
import View from '../../../components/View/View';
import { supabaseAdmin } from '../../../services/ApiService';
import Image from 'next/image';

const AdminBlog = ({ articles }) => {

  const { logged_in } = useAppContext();
  const router = useRouter();

  const [show_new_blog_modal, setShowNewBlogModal] = useState(false);
  const [articles_array, setArticles] = useState(articles);
  const [image, setImage] = useState(null);
  const [createObjectUrl, setObjectUrl] = useState("");
  const view = useView();

  useEffect(() => {
    if(!logged_in)
      router.push('/admin');
  }, [logged_in, router]);

  const delete_article = useCallback((id) => {
    const delete_req = async () => {
      try {
        const delete_article_req = await SendApiRequest(`/api/articles/${id}`, Constants.API_METHODS.DELETE);
        view.setSuccessful(true);
        view.setMessage(Constants.user_messages.delete_blog);
        setArticles(articles => articles.filter(article => article.id !== id));
      } catch (err) {
        view.setFailed(true);
        view.setMessage(err);
      }
    };
    delete_req();
  }, [view]);

    const uploadToClient = useCallback(event => {
          if(event.target.files && event.target.files[0]) {
              const [img] = event.target.files;
              setImage(img);
              setObjectUrl(URL.createObjectURL(img));
          }
    }, []);

    const uploadToServer = useCallback(async (form, id) => {
        try {
            const res =  await SendApiRequest(`/api/file/${id}`, Constants.API_METHODS.POST, form);
        } catch (err) {
          view.setFailed(true);
          view.setMessage(err);
        }
    }, [view]);

    const submit_new_blog = useCallback((event, form) => {    
      const submit_blog = async () => {
        try {
          const add_blog = await SendApiRequest(`/api/articles`, Constants.API_METHODS.POST, form);
          uploadToServer(form, add_blog[0].id);
          view.setSuccessful(true);
          view.setMessage(Constants.user_messages.add_blog);
          setTimeout(() => setShowNewBlogModal(false), 1000);
          setArticles(articles => [...articles, add_blog[0]]);
        } catch (err) {
          view.setFailed(true);
          view.setMessage(err);
        }
      };
      submit_blog();    
  }, [view, uploadToServer]);

    useEffect(() => {
      Constants.new_blog_form[2].action = uploadToClient;
    }, [uploadToClient]);

    return (<>
      <Head>
          <title>PI insurance | Admin | Blog Editor</title>
          <meta name="description" content="PI insurance" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <main>
          <Navbar 
          routes={Constants.admin_routes} />
          <div className='flex sm:flex-row flex-col py-28 gap-10 justify-around px-12 text-white bg-teal-500'>
              <h1 className='sm:text-6xl font-bold text-3xl'>Blog Editor</h1>
          </div>
          <div className='flex flex-col mx-auto my-5 w-fit'>
            <button 
            onClick={() => setShowNewBlogModal(true)}
            className="my-10 mx-auto font-bold py-2 px-4 rounded hover:text-white hover:bg-blue-500 hover:border-white border-2 border-black text-blue-500 bg-white">
              Add new blog
            </button>
            <View successful={view.successful} failed={view.failed} message={view.message} />
            {articles_array.map((article, index) => {
              return <div key={`article-${article.id}`}
                className=" flex gap-5 border border-black py-4 px-6 justify-between">
                  <span>{index + 1}</span>
                  <h2>{article.title}</h2>
                  <div className='flex flex-row gap-2'>
                    <div 
                    onClick={() => delete_article(article.id)}
                    className='text-red-400 cursor-pointer hover:text-black'>
                      <FaTrash></FaTrash>
                    </div>
                    <div className='text-blue-400 cursor-pointer hover:text-black'>
                      <Link href={`blogs/${article.id}`}>
                        <FaPencilAlt></FaPencilAlt>
                      </Link>
                    </div>
                  </div>
              </div>;
            })}
          </div>
          { show_new_blog_modal && <Modal setClose={() => setShowNewBlogModal(false)}>
            <div className='flex flex-col justify-between items-center mx-auto w-fit gap-5'>
              <Form inputs={Constants.new_blog_form} action={submit_new_blog} />  
              <div className="group w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                { image && <Image src={createObjectUrl} layout="fill" alt=""/> }
              </div>
              <View successful={view.successful} failed={view.failed} message={view.message} />
            </div>
          </Modal>}
      </main>
      </>);
}

export default AdminBlog;

export async function getStaticProps() {  
  const {error, data: articles} = await supabaseAdmin.from('blogs').select() || { data: [] };
  return {
    props: {
      articles: articles
    },
    revalidate: 10,
  };
};
