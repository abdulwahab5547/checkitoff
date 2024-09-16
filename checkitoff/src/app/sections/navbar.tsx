import Me from '../../assets/me.jpeg'
import Favicon from '../favicon.ico'
import Image from 'next/image'
import { useAuth } from '../functions/auth-context';
import Modal from '../functions/modal';
import { useState } from 'react';

interface NavbarProps {
    refresh?: () => void;
  }

const Navbar: React.FC<NavbarProps> = ({ refresh }) => {
    const { logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        setIsModalOpen(true);
    };

    const handleConfirmLogout = () => {
        setIsModalOpen(false);
        logout();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const [isRotating, setIsRotating] = useState(false);
    const handleRefresh = () => {
        if (refresh) {  
          setIsRotating(true);
          refresh();
          setTimeout(() => {
            setIsRotating(false);
          }, 1500);
        }
      };

    return(
        <div>
            <div className="flex justify-between items-center pt-3 pb-3 md:w-[94%] w-[90%] m-auto">
                <div className=''>
                    <a href='/' className='flex gap-3 items-center'>
                        <Image src={Favicon} alt='' width={35} className='rounded-xl'/>
                        <p className="md:text-3xl text-2xl font-bold hidden md:block">check<span className="text-orange">it</span>off.</p>
                    </a>
                </div>
                <div className='md:flex hidden gap-5 items-center '>
                    <div>
                        <p>creator:</p>
                    </div>
                    
                    <div className='flex items-center gap-3 py-1'>
                        <div className=''>
                            <Image src={Me} alt='creator' width={50} className='rounded-full border-2 border-orange'/>
                        </div>
                        
                        <div>
                            <a href='https://portfolio-eta-ten-43.vercel.app/' className='text-lg font-semibold hover:text-orange hover:cursor-pointer'>abdul <br/> <span>wahab<span className='text-orange'>.</span></span></a>
                        </div>
                    </div>
                    
                </div>
                <div className='flex gap-6 items-center'>
                    <div className='w-4'>
                        
                    </div>
                    
                    <a href='/'><i className="text-sm fa-solid fa-home hover:text-orange hover:cursor-pointer"></i></a>
                    <a href='/settings'><i className="text-sm fa-solid fa-gear hover:text-orange hover:cursor-pointer"></i></a>
                    <div onClick={handleRefresh}>
                        <i className={`fa-solid fa-arrows-rotate hover:text-orange hover:cursor-pointer ${isRotating ? 'rotate' : ''}`}></i>
                    </div>
                    
                    <a onClick={handleLogout} className="hover:text-orange hover:cursor-pointer flex"><span className='hidden md:block pr-1'>logout</span><span className='md:pl-2'><i className="text-sm fa-solid fa-right-from-bracket"></i></span></a>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onConfirm={handleConfirmLogout}
                    />
                </div>
            </div>
            <hr/>
        </div>
    )
}

export default Navbar; 