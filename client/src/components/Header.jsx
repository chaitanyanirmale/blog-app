import React from 'react'
import { assets } from '../assets/assets'

export default function Header() {
  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
        <div className="text-center mt-20 mb-8">
           <div className="inline-flex items-center justify-center gap-4 mb-4 border border-primary/40 bg-primary/10  rounded-full px-6 py-1.5 text-primary  text-sm">
            <p>New AI ferature integrated</p>
            <img src={assets.star_icon} alt="" className='w-2.5' />
           </div>
           <h1 className='text-3xl sm:text-6xl font-semibold sm:leafing-16 text-gray-700'>Your own <span className='text-primary'>blogging</span> <br />platform.</h1>
           <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-700'>This is your space to think out loud, share what matters, and to write without filters. Wheather it's one word or a thousand, your story starts right here</p>
           <form className='flex justify-center max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
                <input type="text" placeholder='Search for blogs' className='w-full pl-4 outline-none' required/>
                <button type='submit' className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'>Search</button>
           </form>
        </div>
        <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50'/>
    </div>
  )
}
