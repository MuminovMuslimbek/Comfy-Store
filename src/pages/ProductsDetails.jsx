import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Puff } from 'react-loader-spinner'  // Puff spinner import qilish

function ProductsDetails() {
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        setLoading(true)
        axios.get(`https://strapi-store-server.onrender.com/api/products/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setProduct(response.data.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoading(false))
    }, [id])  // id dependentsiz ishlashini ta'minlash

    return (
        <>
            {loading ? (
                <div className='w-full pt-[200px] max-h-[500px] h-full flex justify-center items-center'>
                    <Puff visible={true} height="80" width="80" color="#fff" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass="" />
                </div>
            ) : (
                product.id ? (
                    <div className='max-w-[1100px] w-full mx-auto py-24'>
                        <div>
                            <button>Home</button>
                            <span>{'>'}</span>
                            <button>Products</button>
                        </div>
                        <div className='flex gap-14 justify-between text-[#F8F8F2]'>
                            <img src={product.attributes.image} className='max-w-[500px] h-96 object-cover rounded-lg lg:w-full' alt={product.attributes.title} />
                            <div className='flex flex-col max-w-[500px]'>
                                <h3 className='capitalize text-3xl font-bold'>{product.attributes.title}</h3>
                                <h4 className='text-xl text-neutral-content font-bold mt-2'>{product.attributes.company}</h4>
                                <p className='mt-3 text-xl'>${product.attributes.price}</p>
                                <p className='mt-6 leading-8'>{product.attributes.description}</p>
                                <h4 className='text-md font-medium tracking-wider capitalize mt-6'>Colors</h4>
                                <div className='mt-2'>
                                    <button className='badge w-6 h-6 mr-2 border-2 border-secondary rounded-full border-none select-none bg-[#FF5733]'></button>
                                    <button className='badge w-6 h-6 mr-2 border-2 border-secondary rounded-full border-none select-none bg-[#33FF57]'></button>
                                    <button className='badge w-6 h-6 mr-2 border-2 border-secondary rounded-full border-none select-none bg-[#3366FF]'></button>
                                </div>
                                <div className="flex flex-col max-w-[300px]">
                                    <label htmlFor="amountSelect" className="text-white font-semibold mt-2 mb-2">Amount</label>
                                    <select id="amountSelect" name="amount" className="bg-gray-800 text-white border-2 border-[#BF95F9] rounded-md px-4 py-3 text-[15px] focus:outline-none cursor-pointer focus:ring-1 focus:[#BF95F9]">
                                        {[...Array(20).keys()].map(i => (
                                            <option key={i} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <button className='uppercase text-[15px] px-2 py-3 bg-[#BF95F9] hover:opacity-75 transition-[0.3s] active:scale-95 max-w-[120px] rounded-lg mt-[40px] text-[#272935] font-medium'>
                                    add to bag
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No product data available</p>
                )
            )}
        </>
    )
}

export default ProductsDetails
