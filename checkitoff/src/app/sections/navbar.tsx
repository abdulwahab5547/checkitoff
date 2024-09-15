import Me from '../../assets/me.jpeg'
import Image from 'next/image'
import { useAuth } from '../functions/auth-context';
import Modal from '../functions/modal';
import { useState } from 'react';

interface NavbarProps {
}

const Navbar: React.FC<NavbarProps> = ({ }) => {
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

    return(
        <div>
            <div className="flex justify-between items-center pt-3 pb-3 md:w-[94%] w-[90%] m-auto">
                <div>
                    <a href='/' className="md:text-3xl text-2xl font-bold">check<span className="text-orange">it</span>off.</a>
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
                <div className='flex gap-5 items-center'>
                    <div className='w-7'>
                        
                    </div>
                    
                    
                    {/* <a href='/login' className="hover:text-orange hover:cursor-pointer">login</a>
                    <a href='/register' className="hover:text-orange hover:cursor-pointer">register</a> */}
                    
                    <a onClick={handleLogout} className="hover:text-orange hover:cursor-pointer">logout<span className='pl-2'><i className="text-sm fa-solid fa-arrow-right"></i></span></a>
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