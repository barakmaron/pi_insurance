import React from 'react';
import { useLocation } from 'react-router-dom';
import Constants from '../../Constants';

const Footer = () => {
    const location = useLocation();
  return (
    <div className='flex gap-5 sm:flex-row sm:justify-around flex-col justify-center text-white sm:mx-60 py-3' dir='rtl'>
        <div className='flex justify-center'>
            <ul className='w-fit flex flex-col gap-3 py-2 text-center'>
                {Constants.routes.map(route => {
                    return <li key={route.location}>
                        <a className={
                        location.pathname === route.location ? 
                            `hover:text-white text-black` :
                            `hover:text-black text-white`        
                        } href={route.location}>{route.label}</a>
                    </li>
                })}
            </ul>
        </div>
        <div className='flex justify-center'>
            <ul className='w-fit flex flex-col gap-3 py-2 text-center'>
                {Object.entries(Constants.contact_info).map(([name ,data]) => {
                    return <li key={name}>
                        {data}
                    </li>
                })}
            </ul>
        </div>
    </div>
  )
};

export default Footer;
