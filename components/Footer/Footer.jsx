import React from 'react';
import { AiOutlineLinkedin, AiFillFacebook } from 'react-icons/ai';
import { FiInstagram } from 'react-icons/fi';
import moment from 'moment';
import Link from 'next/link';

const Footer = () => {
    const year = moment().year();
  return (
    <footer className='bg-black py-5 text-white flex justify-center items-center gap-5'>
        <Link href={"https://www.facebook.com/people/Pi-Insurance/100085973664589/"}>
          <AiFillFacebook className='text-blue-700 text-2xl cursor-pointer'></AiFillFacebook>
        </Link>
        <Link href={"https://www.linkedin.com/in/pi-insurance-3121bb252/"}>
          <FiInstagram className='text-pink-500 text-2xl cursor-pointer'></FiInstagram>
        </Link>
        <Link href={"https://www.linkedin.com/in/pi-insurance-3121bb252/"}>
          <AiOutlineLinkedin className='text-blue-500 text-2xl cursor-pointer'></AiOutlineLinkedin>
        </Link>
        <span>Ⓒ PI Insurance {year}</span>
      </footer>
  )
};

export default Footer;
