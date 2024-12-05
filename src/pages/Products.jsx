import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Puff } from 'react-loader-spinner';

function Products() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(function () {
    setLoading(true)
    axios.get('https://strapi-store-server.onrender.com/api/products')
      .then(response => {
        if (response.status == 200) {
          setProducts(response.data.data)
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [])

  function handleRedirect(id) {
    navigate(`/products/${id}`)
  }

  return (
    <>
      {
        loading ? <div className='w-full  pt-[250px] max-h-[500px] h-full flex justify-center items-center'>
          {loading ? (<Puff visible={true} height="80" width="80" color="#fff" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass="" />) : ('')}
        </div> : ''
      }
      <div className='py-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-[1100px] w-full mx-auto'>
        {
          products.length > 0 && products.map(function (product, index) {
            return (
              <div onClick={() => { handleRedirect(product.id) }} key={index} className='text-[#F8F8F2] w-full shadow-xl hover:shadow-2xl transition cursor-pointer select-none duration-300 p-4 rounded-2xl'>
                <img src={product.attributes.image} className='rounded-xl h-64 md:h-48 w-full object-cover' />
                <div className='card-body items-center text-center p-6 flex flex-col gap-2'>
                  <h3 className='capitalize font-medium text-[20px]'>{product.attributes.title}</h3>
                  <p className='text-[#846eaa]'>${product.attributes.price}</p>
                </div>
              </div>
            )
          })
        }
      </div></>
  )
}

export default Products
