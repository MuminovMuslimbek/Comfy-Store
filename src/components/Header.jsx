import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Basket from '../assets/basket.svg'
import Sun from '../assets/sun.svg'

function header() {
    const navigate = useNavigate()

    function handleHomePage() {
        navigate('/')
    }
    function handleNavigateToCart() {
        navigate('/cart')
    }

    return (
        <header className='flex flex-col select-none'>
            <div className=' bg-neutral py-2 text-neutral-content bg-[#414558] '>
                <div className='flex justify-end gap-7 text-[#e9e9e7] max-w-[1100px] w-full mx-auto'>
                    <NavLink to='/login' className='link link-hover text-xs sm:text-sm hover:underline' >Sign in / Guest</NavLink>
                    <NavLink to='/register' className='link link-hover text-xs sm:text-sm hover:underline' >Create Account</NavLink>
                </div>
            </div>
            <div className=' bg-[#181920]'>
                <div className='flex py-3 justify-between max-w-[1100px] w-full mx-auto items-center'>
                    <button className='select-none hidden lg:flex btn btn-primary font-medium text-3xl items-center active  px-4 py-[5px] rounded-lg bg-[#FF7AC6] notActive' onClick={handleHomePage}>C</button>
                    <ul className='flex items-center text-[#F8F8F2]'>
                        <NavLink to='/' className=' py-2 px-4 transition-[0.5s] rounded-lg text-[15px] hover:bg-[#2F2F35]' >Home</NavLink>
                        <NavLink to='/about' className=' py-2 px-4 transition-[0.5s] rounded-lg text-[15px] hover:bg-[#2F2F35]' >About</NavLink>
                        <NavLink to='/products' className=' py-2 px-4 transition-[0.5s] rounded-lg text-[15px] hover:bg-[#2F2F35]'>Products</NavLink>
                        <NavLink to='/cart' className=' py-2 px-4 transition-[0.5s] rounded-lg text-[15px] hover:bg-[#2F2F35]' >Cart</NavLink>
                    </ul>
                    <div className='flex items-center gap-[30px]'>
                        <img className='cursor-pointer hover:rotate-[360deg]' src={Sun} />
                        <div onClick={handleNavigateToCart} className='relative active:scale-95 transition-[0.3s]'>
                            <img src={Basket} className='w-[30px] cursor-pointer' />
                            <span className='absolute top-[-3px] right-[-10px] bg-[#FF7AC6] px-[8px] rounded-2xl text-[10px] '>0</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default header
