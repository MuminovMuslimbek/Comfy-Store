import React from 'react'
import { useNavigate } from 'react-router-dom'

function SignIn() {
  const navigate = useNavigate()

  function handleCLick(event) {
    event.preventDefault()
  }

  function FromRegisterToLogin() {
    navigate('/register')
  }

  return (
    <div className='flex flex-col w-full h-[100vh] justify-center items-center shadow-md gap-6 hover:shadow-2xl transition'>
      <form onSubmit={handleCLick} className='flex flex-col gap-5 max-w-[400px] rounded-2xl text-[#F8F8F2] card w-96 p-8 bg-base-100 shadow-lg gap-y-4'>
        <h1 className='text-[#F8F8F2] text-[30px] font-bold flex justify-center'>Login</h1>
        <label htmlFor="email" className='flex flex-col gap-[7px] text-[14px]'>
          Email
          <input className='bg-transparent border p-3 rounded-lg   outline-none focus:border-[2px] border-[] border-[#4d4d4d]' type="email" />
        </label>
        <label htmlFor="password" className='flex flex-col gap-[7px] mb-[15px] mt-[10px] text-[14px]'>
          Password
          <input className='bg-transparent border p-3 rounded-lg outline-none focus:border-[2px] border-[#4d4d4d]' type="password" />
        </label>
        <button className='text-[16px] font-medium py-[13px] rounded-lg text-[#272935] uppercase active:scale-95 transition-[0.3s] bg-[#FF7AC6] hover:bg-[#FF57B6]' type='submit'>Login</button>
        <button className='text-[16px] font-medium py-[13px] rounded-lg text-[#272935] uppercase active:scale-95 transition-[0.3s] bg-[#BF95F9] hover:bg-[#bf95f9d9]' type='submit'>Guest user</button>
        <p className='flex justify-center gap-3'>Not a member yet? <button onClick={FromRegisterToLogin} className='text-[#FF7AC6] hover:underline hover:opacity-95'>Register</button></p>
      </form>
    </div>
  )
}

export default SignIn
