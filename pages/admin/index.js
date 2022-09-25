import Head from 'next/head';
import Navbar from '../../components/NavBar/NavBar';
import Constants from '../../Constants';
import { useAppContext } from '../../Hooks/useAppContext';
import Form from '../../components/Form/Form';
import { useCallback, useState, useEffect } from 'react';
import SendApiRequest from '../../services/ApiService';
import crypto from 'crypto';
import { useRouter } from 'next/router';

const AdminPage = () => {

    const { logged_in, setLogin } = useAppContext();
    const router = useRouter();

    const [successful, setSuccessful] = useState(false);
    const [failed, setFailed] = useState(false);
    const [message, setMessage] = useState("");

    const submit_login_action = useCallback((event, form) => {        
        event.preventDefault();
        form = Object.fromEntries(form);
        const send_form = async () => {
            try {
                form.password = crypto.createHash('sha512').update(form.password).digest('hex');
                const res = await SendApiRequest(`/api/auth/login`, Constants.API_METHODS.POST, form);
                setLogin(true);
                setSuccessful(true);
                setFailed(false);
                setMessage(Constants.user_messages.login_successful);
            } catch (err) {
                setLogin(false);
                setFailed(true);
                setSuccessful(false);
                setMessage(Constants.user_messages.login_failed);
            }
        };

        send_form();
        
    }, [setLogin]);

    useEffect(() => {
        if(logged_in)
            router.push('admin/blogs');
    }, [logged_in, router]);

  return (<>
    <Head>
        <title>PI insurance | Admin</title>
        <meta name="description" content="PI insurance" />
        <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
        <Navbar 
        routes={Constants.admin_routes} />
        <div className='flex sm:flex-row flex-col py-28 gap-10 justify-around px-12 text-white bg-teal-500'>
            <h1 className='sm:text-6xl font-bold text-3xl'>Login</h1>
            <div>
                { !logged_in && <Form inputs={Constants.login_form} action={submit_login_action} /> }
                { successful && <div className='bg-green-300 border-2 py-2 px-4 border-green-500 my-2 rounded-2xl text-black'>{message}</div> }
                { failed && <div className='bg-rose-300 border-2 py-2 px-4 border-rose-500 my-2 rounded-2xl text-black'>{message}</div> }
            </div>
        </div>
        
    </main>
    </>);
}

export default AdminPage;
