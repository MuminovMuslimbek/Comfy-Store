import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Puff } from 'react-loader-spinner';

function Products() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState(530);

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
      <form className='max-w-[1100px] w-full mx-auto my-[50px] flex flex-col gap-[30px] p-[30px] bg-[#181920] rounded-lg'>
        <div className="flex justify-between gap-[20px]">
          <label className="flex flex-col w-[23%] gap-[7px] text-[#f8f8f8] text-[16px]" htmlFor="product">
            Search Product
            <input id="product" className="bg-[#272935] text-[#f8f8f8] rounded-lg py-[10px] px-3 focus:outline-none focus:ring-2 focus:ring-[#f06292]" type="text" />
          </label>
          <label className="flex flex-col w-[23%] gap-[7px] text-[#f8f8f8] text-[16px]" htmlFor="category">
            Select Category
            <select id="category" className="bg-[#272935] text-[#f8f8f8] rounded-lg py-[10px] px-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f06292]">
              <option value="all">all</option>
              <option value="tables">Tables</option>
              <option value="chairs">Chairs</option>
              <option value="kids">Kids</option>
              <option value="sofas">Sofas</option>
              <option value="beds">Beds</option>
            </select>
          </label>
          <label className="flex flex-col w-[23%] gap-[7px] text-[#f8f8f8] text-[16px]" htmlFor="company">
            Select Company
            <select id="company" className="bg-[#272935] text-[#f8f8f8] rounded-lg py-[10px] px-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f06292]">
              <option value="all">all</option>
              <option value="modenza">Modenza</option>
              <option value="luxora">Luxora</option>
              <option value="artifex">Artifex</option>
              <option value="comfora">Comfora</option>
              <option value="homestead">Homestead</option>
            </select>
          </label>
          <label className="flex flex-col w-[23%] gap-[7px] text-[#f8f8f8] text-[16px]" htmlFor="sort">
            Sort By
            <select id="sort" className="bg-[#272935] text-[#f8f8f8] rounded-lg py-[10px] px-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f06292]">
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
              <option value="high">high</option>
              <option value="low">low</option>
            </select>
          </label>
        </div>
        <div className="flex flex-col gap-3 w-full text-[#f8f8f8] font-medium">
          <label htmlFor="price" className="flex justify-between items-center">
            <span>Select Price</span>
            <span>${price.toFixed(2)}</span>
          </label>
          <input id="price" type="range" min="0" max="1000" step="1" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full h-2 bg-[#272935] rounded-full appearance-none cursor-pointer outline-none" style={{ background: `linear-gradient(to right, #f06292 0%, #f06292 ${(price / 1000) * 100}%, #272935 ${(price / 1000) * 100}%, #272935 100%)`, }} />
          <div className="flex justify-between text-sm">
            <span>0</span>
            <span>Max: $1,000.00</span>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button className="px-6 py-2 bg-[#f06292] text-[#1b1c21] font-semibold rounded-lg hover:opacity-80 transition">
            SEARCH
          </button>
          <button className="px-6 py-2 bg-[#ffa726] text-[#1b1c21] font-semibold rounded-lg hover:opacity-80 transition">
            RESET
          </button>
        </div>
      </form>
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
