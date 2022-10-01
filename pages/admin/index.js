import Head from 'next/head';
import Navbar from '../../components/NavBar/NavBar';
import Constants from '../../Constants';
import { useAppContext } from '../../Hooks/useAppContext';
import Form from '../../components/Form/Form';
import { useCallback, useState, useEffect } from 'react';
import SendApiRequest from '../../services/ApiService';
import crypto from 'crypto';
import { useRouter } from 'next/router';
import View from '../../components/View/View';
import useView from '../../Hooks/useView';

const AdminPage = () => {

    const { logged_in, setLogin } = useAppContext();
    const router = useRouter();

    const view = useView();

    const submit_login_action = useCallback((event, form) => {        
        event.preventDefault();
        form = Object.fromEntries(form);
        const send_form = async () => {
            try {
                form.password = crypto.createHash('sha512').update(form.password).digest('hex');
                const res = await SendApiRequest(`/api/auth/login`, Constants.API_METHODS.POST, form);
                setLogin(true);
                view.SetSuccessful(Constants.user_messages.login_successful);
            } catch (err) {
                setLogin(false);
                view.SetFailed(Constants.user_messages.login_failed);
            }
        };
        send_form();        
    }, [setLogin, view]);

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
                <View successful={view.successful} failed={view.failed} message={view.message} />
            </div>
        </div>
        
    </main>
    </>);
}

export default AdminPage;
