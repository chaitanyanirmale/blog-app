import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';

export default function Layout() {
    const navigate = useNavigate();
    const logout = () => {
        // localStorage.removeItem("token");
        // sessionStorage.removeItem("token");
        navigate("/login");
    }
  return (
    <>
        <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
             <h1 onClick={()=> navigate('/')} className='text-2xl  pl-2 uppercase font-bold text-gray-700 w-50 text-center cursor-pointer'>BlogSphere</h1>
            <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
        </div>
        <div className="flex h-[calc(100vh-70px)]">
            <Sidebar />
            <Outlet />
        </div>
    </>
  )
}
