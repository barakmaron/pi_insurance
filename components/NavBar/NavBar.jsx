import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useScrollPosition } from '../../Hooks/useScrollPosition';
import logo from '../../public/logo.webp';
import Button from '../Button/Button';

const Navbar = ({ 
  routes,
  open_modal
}) => {
  const router = useRouter();
  const scroll_position = useScrollPosition();

  return (
    <nav className={`sticky top-0 z-50 flex w-full bg-blue-500 py-4 sm:gap-5 gap-2 items-center justify-around text-white text-lg font-bold transition-all ${scroll_position && `shadow-xl`}`}>
      <div className=' h-20 w-36 relative'>
        <Link href={`/`} className="cursor-pointer">
          <Image src={logo} 
          alt="logo" 
          layout="fill"
          objectFit="contain"
          className='cursor-pointer' />
        </Link>
      </div>
      <div className='flex sm:gap-10 gap-5 items-center'>
        {routes.map(route => {
          if(route.type)
            return <Button text={route.label} key={`navbar-${route.location}`} onClick={open_modal} />
          return <Link key={`navbar-${route.location}`}
          className={
            router?.location === route.location ? 
              `border-b-2 border-white text-white py-2` :
              `border-b-2 hover:border-white text-white py-2 border-transparent `
          } href={route.location}>{route.label}</Link>;
        })}
      </div>
    </nav>
  )
};

export default Navbar;
