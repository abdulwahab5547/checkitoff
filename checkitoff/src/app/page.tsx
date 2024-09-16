'use client'

import { usePathname } from 'next/navigation'
import MainPart from './sections/mainpart'
import Register from './register/page'
import Settings from './settings/page'
import Login from './login/page'
import { useAuth } from '../app/functions/auth-context';

export default function Home() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth();
  return (
    <div className=''>
      {pathname === '/' && isAuthenticated && <MainPart />}
      {pathname === '/settings' && isAuthenticated && <Settings />}
      {pathname === '/register' && !isAuthenticated && <Register />}
      {pathname === '/register' && isAuthenticated && <Register />}
      {pathname === '/login' && !isAuthenticated && <Login />}
      {pathname === '/' && !isAuthenticated && <Login />}
    </div>
  );
}