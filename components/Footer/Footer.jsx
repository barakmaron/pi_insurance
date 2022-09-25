import React from 'react';
import { AiOutlineLinkedin, AiFillFacebook } from 'react-icons/ai';
import { FiInstagram } from 'react-icons/fi';
import moment from 'moment';

const Footer = () => {
    const year = moment().year();
  return (
    <footer className='bg-black py-5 text-white flex justify-center items-center gap-5'>
        <AiFillFacebook className='text-blue-700 text-2xl'></AiFillFacebook>
        <FiInstagram className='text-pink-500 text-2xl'></FiInstagram>
        <AiOutlineLinkedin className='text-blue-500 text-2xl'></AiOutlineLinkedin>
        <span>Ⓒ PI Insurance {year}</span>
      </footer>
  )
};

export default Footer;
