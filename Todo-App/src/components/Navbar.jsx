import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-indigo-900 text-white py-3 md:w-full sm:w-full '>
        <div className="Logo hover:scale-110 transition-all duration-100"><span className='font-bold text-xl mx-9 hover:font-extrabold'>Errands</span></div>
        <ul className="flex gap-8 mx-12">
            <li className='cursor-pointer hover:font-bold transition-all duration-150'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-150'>Errands</li>
       
        </ul>
    </nav>
  )
}

export default Navbar