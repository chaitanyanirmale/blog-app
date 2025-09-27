import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../pages/admin/Dashboard';
export default function Login() {

  const {setToken} = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/admin/login', {email, password});
      if(data.success){
        setToken(data.token);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = data.token;
        navigate("/")
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className='text-3xl font-bold'>
              <span className='text-primary'>Admin</span> Login
            </h1>
            <p className='font-light'>Enter your credentials to access the admin panel</p>
          </div>
          <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
            <div className="flex flex-col">
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='email' id="email" required className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
            </div>
            <div className="flex flex-col">
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='password' id="password" required className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
            </div>
            <button type='submit' className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}
