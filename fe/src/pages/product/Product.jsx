import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axiosClient from '../../api/axiosClient'
import Navbar from '../../components/navbar/Navbar'
import ProductList from '../../components/product/ProductList'
import './Product.scss'

function Product() {
    const location = useLocation();
    const query = location.state?`products?search=${location.state}`:'products';
    console.log(query);

    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axiosClient.get(query);
                console.log(res.data)
                setProducts(res.data);
            } catch(err) {
                console.log(err);
            }
            
        }

        fetchData();
        
    },[query]);

  return (
    <div className="product-page">
        <Navbar/>
        <div className="filter">
                ---Filter---
        </div>
        <div className="product-list">
            {/* <ProductList/> */}
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
      
    </div>
  )
}

export default Product
