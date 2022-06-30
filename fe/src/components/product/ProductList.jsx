import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axiosClient from '../../api/axiosClient'
import Navbar from '../navbar/Navbar'
import './ProductList.scss'

function ProductList() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axiosClient.get("products")
                console.log(res.data)
                setProducts(res.data);
            } catch(err) {
                console.log(err);
            }
            
        }

        fetchData();
        
    },[])
  return (

        <div className="products-list">
            {products.map((product, index) => (
                <div class = "product-container" key={index}>
                    <div class = "top">
                        <img src={product.image} alt="" />
                    </div>
                    <div className="bottom">
                        <div className="info">
                            <p>{product.name}</p>
                        </div>
                    </div>
                    
                </div>
            
            ))}
        </div>
    
  )
}

export default ProductList
