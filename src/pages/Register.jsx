import React from 'react'

function register() {

  function handleCLick(event) {
    event.preventDefault()
  }

  return (
    <div className='flex flex-col w-full h-[100vh] justify-center items-center gap-7'>
      <h1>Create acount</h1>
      <form className='flex flex-col gap-5 max-w-[300px] w-full'>
        <input type="text" />
        <input type="email" />
        <button onSubmit={handleCLick}>submit</button>
      </form>
    </div>
  )
}

export default register
