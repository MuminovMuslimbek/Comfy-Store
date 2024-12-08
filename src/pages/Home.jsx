import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Hero from '../assets/hero.webp'
import Hero2 from '../assets/hero2.webp'
import Hero3 from '../assets/hero3.webp'
import Hero4 from '../assets/hero4.webp'
import { useNavigate } from 'react-router-dom'
import { Puff } from 'react-loader-spinner';

function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    axios.get('https://strapi-store-server.onrender.com/api/products?featured=true')
      .then(response => {
        if (response.status === 200) {
          setData(response.data.data)
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false)) 
  }, [])

  function handleProductPage() {
    navigate('/products')
  }

  function handleRedirect(id) {
    navigate(`/products/${id}`)
  }

  return (
    <div className='max-w-[1100px] w-full mx-auto py-20'>
      {loading ? (
        <div className='w-full pt-[200px] max-h-[500px] h-full flex justify-center items-center'>
          <Puff visible={true} height="80" width="80" color="#fff" ariaLabel="puff-loading" wrapperStyle={{}} wrapperclassName=""/>
        </div>
      ) : (
        <div>
          <div className='flex justify-between items-center pb-24'>
            <div className='flex max-w-[600px] flex-col items-start'>
              <h1 className='max-w-[500px] text-[#F8F8F2] text-4xl font-bold tracking-tight sm:text-6xl '>We are changing the way people shop</h1>
              <p className='max-w-[450px] text-[#F8F8F2] mt-8 text-lg leading-8'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim soluta temporibus asperiores aut obcaecati perferendis porro nobis.
              </p>
              <button onClick={handleProductPage} className='text-[#272935] bg-[#FF7AC6] mt-[40px] active:scale-95 transition-[0.3s] font-medium uppercase px-4 py-3 rounded-lg'>
                our products
              </button>
            </div>
            <div className="max-w-[460px] hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
              <img className="max-w-[350px] w-full h-full rounded-2xl" src={Hero} alt="Hero" />
              <img className="max-w-[350px] w-full h-full rounded-2xl" src={Hero2} alt="Hero2" />
              <img className="max-w-[350px] w-full h-full rounded-2xl" src={Hero3} alt="Hero3" />
              <img className="max-w-[350px] w-full h-full rounded-2xl" src={Hero4} alt="Hero4" />
            </div>
          </div>
          <div className='border-b border-base-300 pb-5 capitalize text-[#F8F8F2]'>
            <h2 className='text-3xl font-medium tracking-wider capitalize '>featured products</h2>
          </div>
          <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {
              data && data.map((product, index) => (
                <div onClick={() => { handleRedirect(product.id) }} key={index} className='text-[#F8F8F2] w-full shadow-xl hover:shadow-2xl transition cursor-pointer select-none duration-300 p-4 rounded-2xl'>
                  <img className='rounded-xl h-64 md:h-48 w-full object-cover' src={product.attributes.image} alt={product.attributes.title} />
                  <div className='card-body items-center text-center p-6 flex flex-col gap-2'>
                    <h3 className='capitalize font-medium text-[20px]'>{product.attributes.title}</h3>
                    <p className='text-[#846eaa]'>${product.attributes.price}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
