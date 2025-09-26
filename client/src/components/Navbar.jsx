import React from 'react'
import {assets} from '../assets/assets.js'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';
export default function Navbar() {
  const {navigate, token} = useAppContext();
  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer'>
        {/* <img onClick={()=> navigate('/')} src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' /> */}
        <div className='w-35 text-center rounded-lg  cursor-pointer flex  items-center'>
          <div className='bg-primary h-10 w-1 '></div>
          <h1 onClick={()=> navigate('/')} className='text-2xl  pl-2 uppercase font-semibold text-gray-700 '>My Blogs</h1>
        </div>
        <button onClick={()=> navigate('/admin')} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>{token ? 'Dashboard' : 'Login'}
            <img src={assets.arrow} alt="arrow" className='w-3' />
        </button>
    </div>
  )
}
