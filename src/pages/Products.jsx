import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Puff } from 'react-loader-spinner';
import burgerBold from '../assets/img.svg'
import burger from '../assets/burger.svg'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState(1000);
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [company, setCompany] = useState('all')
  const [order, setOrder] = useState('a-z')
  const [filterProduct, setFilterProduct] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true);
    axios.get(`https://strapi-store-server.onrender.com/api/products`)
      .then(response => {
        console.log(response);
        if (response.status === 200 && response.data) {
          setProducts(response.data.data);
          setFilterProduct(response.data.meta);
        } else {
        }
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  function handleRedirect(id) {
    navigate(`/products/${id}`)
  }

  function handleSearch(event) {
    event.preventDefault()
    axios.get(`https://strapi-store-server.onrender.com/api/products?search=${search}&category=${category}&company=${company}&order=${order}&page=${0}`)
      .then(response => {
        if (response.status == 200) {
          if (response.data) {
            setProducts(response.data.data)
            setFilterProduct(response.data.meta)
          }
        }
      })
      .catch(err => {
        console.log(err);
        navigate('/products')
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <form className='flex flex-col gap-[30px] bg-[#181920] mx-auto my-[50px] p-[30px] rounded-lg w-full max-w-[1100px]'>
        <div className="flex justify-between gap-[20px]">
          <label className="flex flex-col gap-[7px] w-[23%] text-[#f8f8f8] text-[16px]" htmlFor="product">
            Search Product
            <input id="product" value={search} onChange={(e) => setSearch(e.target.value)} className="border-[#767575] bg-[#272935] px-3 py-[5px] border rounded-lg focus:ring-2 focus:ring-[#f06292] text-[#f8f8f8] focus:outline-none" type="text" />
          </label>
          <label className="flex flex-col gap-[7px] w-[23%] text-[#f8f8f8] text-[16px]" htmlFor="category">
            Select Category
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border-[#767575] bg-[#272935] px-3 py-[5px] border rounded-lg focus:ring-2 focus:ring-[#f06292] text-[#f8f8f8] cursor-pointer focus:outline-none">
              {filterProduct && filterProduct.categories && filterProduct.categories.length > 0 ? (
                filterProduct.categories.map((value, index) => (
                  <option key={index} value={value}>{value}</option>
                ))
              ) : (
                <option value="all">No categories available</option>
              )}
            </select>
          </label>
          <label className="flex flex-col gap-[7px] w-[23%] text-[#f8f8f8] text-[16px]" htmlFor="company">
            Select Company
            <select value={company} id="company" onChange={(e) => setCompany(e.target.value)} className="border-[#767575] bg-[#272935] px-3 py-[5px] border rounded-lg focus:ring-2 focus:ring-[#f06292] text-[#f8f8f8] cursor-pointer focus:outline-none">
              {
                filterProduct && filterProduct.companies && filterProduct.companies.length > 0 ? (
                  filterProduct.companies.map((value, index) => (
                    <option key={index} value={value}>{value}</option>
                  ))
                ) : (
                  <option value={'all'}>No companies available</option>
                )
              }
            </select>
          </label>
          <label className="flex flex-col gap-[7px] w-[23%] text-[#f8f8f8] text-[16px]" htmlFor="sort">
            Sort By
            <select value={order} id="sort" onChange={(e) => setOrder(e.target.value)} className="border-[#767575] bg-[#272935] px-3 py-[5px] border rounded-lg focus:ring-2 focus:ring-[#f06292] text-[#f8f8f8] cursor-pointer focus:outline-none">
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
              <option value="high">high</option>
              <option value="low">low</option>
            </select>
          </label>
        </div>
        <div className='flex justify-between items-center gap-[20px]'>
          <div className="flex flex-col gap-3 w-full max-w-[240px] font-medium text-[#f8f8f8]">
            <label htmlFor="price" className="flex justify-between items-center">
              <span>Select Price</span>
              <span>${price.toFixed(2)}</span>
            </label>
            <input id="price" type="range" min="0" max="1000" step="1" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="range range-secondary range-sm"/>
            <div className="flex justify-between text-sm">
              <span>0</span>
              <span>Max: $1,000.00</span>
            </div>
          </div>
          <div className="w-full max-w-[230px]">
            <label htmlFor="checkbox" className="flex flex-col items-center gap-[7px] w-full text-[#f8f8f8] text-[16px]">
              Free shopping
              <input id="checkbox" type="checkbox" className="checkbox checkbox-secondary checkbox-sm" />
            </label>
          </div>
          <button onClick={handleSearch} className="bg-[#f06292] hover:opacity-80 px-6 py-[6px] rounded-lg w-full max-w-[230px] font-semibold text-[#1b1c21] transition active:scale-95">
            SEARCH
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              setLoading(true);

              axios.get(`https://strapi-store-server.onrender.com/api/products`)
                .then((response) => {
                  if (response.status === 200 && response.data) {
                    setProducts(response.data.data);
                    setFilterProduct(response.data.meta);
                    setPrice(1000);
                    setSearch('');
                    setCategory('all');
                    setCompany('all');
                    setOrder('a-z');
                  }
                })
                .catch((err) => {
                  console.error(err);
                })
                .finally(() => setLoading(false));
            }}
            className="bg-[#ffa726] hover:opacity-80 px-6 py-[6px] rounded-lg w-full max-w-[230px] font-semibold text-[#1b1c21] transition active:scale-95">
            RESET
          </button>
        </div>
      </form >
      <div className='mx-auto w-full max-w-[1100px]'>
        <div className='flex justify-between pb-5 border-b border-base-300 text-[#F8F8F2]'>
          <h2 className='font-medium text-[17px] text-3xl tracking-wider'>{filterProduct.pagination && filterProduct.pagination.total} products</h2>
          <div className="flex gap-x-2">
            <button type="button" className="bg-[#FF7AC6] hover:bg-[#FF7AC6] text-primary-content text-xl btn btn-circle btn-sm">
              <img src={burgerBold} />
            </button>
            <button type="button" className="text-based-content text-xl btn btn-circle btn-ghost btn-sm">
              <img src={burger} className='text-white' />
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <div className='flex justify-center items-center pt-[250px] w-full h-full max-h-[500px]'>
          <Puff visible={true} height="80" width="80" color="#fff" ariaLabel="puff-loading" />
        </div>
      )}
      <div className='gap-4 grid md:grid-cols-2 lg:grid-cols-3 mx-auto py-12 w-full max-w-[1100px]'>
        {
          products.length == 0 ? (
            <p className='mx-auto mt-16 w-[1000px] text-[#f8f8f8] text-2xl'>Sorry, no products matched your search...</p>
          ) : products.map(function (product, index) {
            return (
              <div onClick={() => { handleRedirect(product.id) }} key={index} className='shadow-xl hover:shadow-2xl p-4 rounded-2xl w-full text-[#F8F8F2] transition duration-300 cursor-pointer select-none'>
                <img src={product.attributes.image} className='rounded-xl w-full h-64 md:h-48 object-cover' />
                <div className='flex flex-col items-center gap-2 p-6 text-center card-body'>
                  <h3 className='font-medium text-[20px] capitalize'>{product.attributes.title}</h3>
                  <p className='text-[#846eaa]'>${product.attributes.price}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Products
