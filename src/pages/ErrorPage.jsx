import React from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
    const navigate = useNavigate()

    function handleFromErrorPageToHome() {
        navigate('/')
    }

    return (
        <div className='w-full h-[100vh] flex items-center justify-center flex-col'>
            <h1 className='text-[#FF7AC6] text-[150px] font-medium'>404</h1>
            <h4 className='text-[#F8F8F2] text-[50px] font-bold mt-[-30px]'>page not found</h4>
            <p className='text-[#cdcdcd] text-[20px] font-medium mt-[10px]'>Sorry,we couldn't find the page you're lookind for.</p>
            <button onClick={handleFromErrorPageToHome} className='text-[#272935] bg-[#BF95F9] mt-[50px] uppercase text-[17px] font-medium py-3 px-4 rounded-lg active:scale-95 transition-[0.3s]'>go back home</button>
        </div>
    )
}

export default ErrorPage
