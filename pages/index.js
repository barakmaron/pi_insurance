import Head from 'next/head';
import Navbar from '../components/NavBar/NavBar';
import Constants from '../Constants';
import _ from 'lodash';
import useView from '../Hooks/useView';
import View from '../components/View/View';
import { useCallback, useRef, useState } from 'react';
import SendApiRequest from '../services/ApiService';
import Button from '../components/Button/Button';
import { SiFastapi } from 'react-icons/si';
import { AiOutlineAlert } from 'react-icons/ai';
import { GiTakeMyMoney } from 'react-icons/gi';
import { MdOutlineDesignServices } from 'react-icons/md';
import EmailFromModal from '../components/EmailFromModal/EmailFromModal';
import Footer from '../components/Footer/Footer';

export default function Home() {

  const view = useView();

  const [show_email_modal, setShowEmailModal] = useState(false);
  const email_input_ref = useRef(null);

  const submit_email = useCallback(async (event, form) => {
    event.preventDefault();
    try {
      const add_email = await SendApiRequest(`/api/email`, Constants.API_METHODS.POST, form);
      view.SetSuccessful(Constants.user_messages.add_email);
    } catch (err) {
      view.SetFailed(Constants.user_messages.add_email_failed);
    }
  }, [view]);

  return (
    <>
      <Head>
        <title>PI insurance</title>
        <meta name="description" content="PI insurance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar 
        routes={Constants.routes}
        open_modal={() => setShowEmailModal(true)} />
        <div className=' bg-blue-500 py-16 flex items-center justify-center flex-col'>
          <h1 className='text-white sm:text-7xl text-4xl font-bold py-20 text-center'>Insurance for instagram business accounts.</h1>
          <div>
            <p className='text-white text-lg text-center '>
            In the event of a hack, we compensate Instagram businesses. 
            <br></br> 
            Now you finally have a choice: You can lose everything to a hack, or you can protect everything with pi.
            </p>            
          </div>
          <div className='my-10 mx-auto w-fit flex flex-col sm:flex-col sm:justify-start gap-5'>
            <div className='mx-auto w-fit flex flex-col sm:flex-row sm:justify-start gap-5'>
              <input 
              type="email"
              className=" py-2 px-4 h-fit rounded border-black border-2 text-teal-500 font-bold sm:text-xl "
              placeholder="Email"
              ref={email_input_ref} />
              <Button text="Get Insured" onClick={(event) => submit_email(event, { email: email_input_ref.current.value })} />  
            </div>
            { !show_email_modal && <View successful={view.successful} failed={view.failed} message={view.message} /> }
          </div>
        </div>
        <div className='flex justify-center items-center flex-col'>
          <h2 className='text-black sm:text-7xl text-4xl font-extrabold  py-40'>PI has you covered.</h2>
          <ul className='flex sm:gap-10 flex-wrap justify-around px-10 text-center gap-5 mb-5'>
            <li className=' sm:w-80'>
              <div className='mx-auto w-fit my-3 text-5xl text-blue-400'>
                <SiFastapi></SiFastapi>
              </div>
              <h3 className='sm:text-3xl font-bold text-xl pb-4'>Get an instant quote</h3>
              <p>You`re insured in just a few clicks. We provide simple self-service from onboarding to claiming.</p>
            </li>
            <li className=' sm:w-80'>
              <div className='mx-auto w-fit my-3 text-5xl text-red-400'>
                <AiOutlineAlert></AiOutlineAlert>
              </div>
              <h3 className='sm:text-3xl font-bold text-xl  pb-4'>A real-time alert system</h3>
              <p>In the event that your account has been hacked, we will notify you and assist you before you know it.</p>
            </li>
            <li className='sm:w-80'>
              <div className='mx-auto w-fit my-3 text-5xl text-green-400'>
                <GiTakeMyMoney></GiTakeMyMoney>
              </div>
              <h3 className='sm:text-3xl font-bold text-xl  pb-4'>Payouts are immediate</h3>
              <p>A daily payment will be made based on your coverage each day your account is hacked.</p>
            </li>
            <li className=' sm:w-80'>
              <div className='mx-auto w-fit my-3 text-5xl text-zinc-400'>
                <MdOutlineDesignServices></MdOutlineDesignServices>
              </div>
              <h3 className='sm:text-3xl font-bold text-xl  pb-4'>We provide retrieval services</h3>
              <p>Our team of experts works around the clock to retrieve your instagram business account.</p>
            </li>            
          </ul>
          <Button onClick={() => setShowEmailModal(true)} text="Get Insured" />
        </div>
        <div className='py-10 flex flex-col md:flex-row justify-center xl:gap-96 gap-5 items-center sm:px-20 '>
          <div className='sm:w-96 w-fit mx-10'>
            <h2 className='sm:text-5xl text-3xl font-bold'>
              Your account has been hacked. What`s next?
            </h2>
            <p className='pt-10'>
            We work not only to pay you, but also to retrieve your account once it has been paid out.
            </p>
            <Button onClick={() => setShowEmailModal(true)} text="Get Insured" />
          </div>
          <div className='w-fit mx-5'>
            <ul className='flex flex-col gap-5 mx-auto w-fit text-start'>
              {Constants.numbers_section_text.map((section, index) => {
                return <li key={`text-section-${index}`} className='flex flex-row gap-4 sm:w-80'>
                        <div className={`border-black border-solid border-2 py-5 px-7 rounded-full shadow-md justify-center h-fit`} 
                        style={{"background-color": section.color }}>
                          <span className='text-2xl font-bold'>{index + 1}</span>
                        </div>
                        <div className='flex justify-center items-center'>
                          <span className='text-2xl font-bold'>{section.text}</span>
                        </div>
                      </li>;
              })}
            </ul>
          </div>
        </div>
        <EmailFromModal show={show_email_modal} setShow={setShowEmailModal} />
      </main>
      <Footer></Footer>
    </>
  )
};
