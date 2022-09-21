import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '../../../Hooks/useAppContext';
import SendApiRequest from '../../../services/ApiService';
import Head from 'next/head';
import Navbar from '../../../components/NavBar/NavBar';
import Constants from '../../../Constants';

const EmailsAdmin = ({ emails }) => {
    const { logged_in } = useAppContext();
    const router = useRouter();  
  
    useEffect(() => {
      if(!logged_in)
        router.push('/admin');
    }, [logged_in, router]);

      return (<>
        <Head>
            <title>PI insurance | Admin | Emails</title>
            <meta name="description" content="PI insurance" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    
        <main>
            <Navbar 
            routes={Constants.admin_routes} />
            <div className='flex sm:flex-row flex-col py-28 gap-10 justify-around px-12 text-white bg-teal-500'>
                <h1 className='sm:text-6xl font-bold text-3xl'>Emails</h1>
            </div>
            <div className='flex flex-col mx-auto my-5 w-fit'>
              {emails.map((email, index) => {
                return <div key={`article-${email.id}`}
                  className=" flex gap-5 border border-black py-4 px-6 justify-between">
                   <span>{index + 1}</span>
                   <span>{email.email}</span>
                </div>;
              })}
            </div>
        </main>
        </>);
}

export default EmailsAdmin;

export async function getStaticProps() {
  const { error, data } = await supabaseAdmin.from('emails').select();
  if(!error)
    return {
        props: {
            emails: data || []
        }
    };
}

