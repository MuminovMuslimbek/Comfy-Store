import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Puff } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { CountCart } from '../App'



function ProductsDetails() {
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const [productColor, setProductColor] = useState('')
    const [amount, setAmount] = useState(1)
    const { count, setCount } = useContext(CountCart)

    useEffect(() => {
        setLoading(true)
        axios.get(`https://strapi-store-server.onrender.com/api/products/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setProduct(response.data.data)
                    if (response.data.data.attributes.colors && response.data.data.attributes.colors.length > 0) {
                        setProductColor(response.data.data.attributes.colors[0])
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoading(false))
    }, [id])

    function handleToHomePage() {
        navigate('/')
    }

    function handleToProductsPage() {
        navigate('/products')
    }

    function handleAddToCart(event) {
        event.preventDefault()
        const cartProduct = {
            cartID: product.id + productColor,
            productID: product.id,
            image: product.attributes.image,
            title: product.attributes.title,
            price: product.attributes.price,
            company: product.attributes.company,
            productColor: productColor,
            amount,
        }

        let existingCart = JSON.parse(localStorage.getItem('cart')) || []
        existingCart.push(cartProduct)
        localStorage.setItem('cart', JSON.stringify(existingCart))
    }

    return (
        <>
            {loading ? (
                <div className='w-full pt-[200px] max-h-[500px] h-full flex justify-center items-center'>
                    <Puff visible={true} height="80" width="80" color="#fff" ariaLabel="puff-loading" wrapperStyle={{}} wrapperclassName="" />
                </div>
            ) : (
                product.id && (
                    <div className='max-w-[1100px] w-full mx-auto py-24 h-full'>
                        <div className='flex items-center gap-2 text-[#F8F8F2] pb-[25px]'>
                            <button className='hover:underline' onClick={handleToHomePage}>Home</button>
                            <span className='text-[#bebebe] font-medium'>{'>'}</span>
                            <button className='hover:underline' onClick={handleToProductsPage}>Products</button>
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
                                    {
                                        product.attributes.colors && product.attributes.colors.map((color, index) => (<button key={index} type='button' className={`badge w-6 h-6 mr-2 ${color === productColor && 'border-2 border-secondary'}`} style={{ backgroundColor: color }} onClick={() => setProductColor(color)}></button>))
                                    }
                                </div>
                                <div className="flex flex-col max-w-[300px]">
                                    <label htmlFor="amountSelect" className="text-white font-semibold mt-2 mb-2">Amount</label>
                                    <select onChange={(e) => { setAmount(parseInt(e.target.value)) }} id="amountSelect" name="amount" className="bg-gray-800 text-white border-2 border-[#BF95F9] rounded-md px-4 py-3 text-[15px] focus:outline-none cursor-pointer focus:ring-1 focus:[#BF95F9]">
                                        {[...Array(20).keys()].map(i => (
                                            <option key={i} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <button onClick={handleAddToCart} className='uppercase text-[15px] px-2 py-3 bg-[#BF95F9] hover:opacity-75 transition-[0.3s] active:scale-95 max-w-[120px] rounded-lg mt-[40px] text-[#272935] font-medium'>
                                    add to bag
                                </button>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    )
}

export default ProductsDetails
