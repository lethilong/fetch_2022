import React from 'react'
import './Navbar.scss'
import {Search, ShoppingCartOutlined} from '@material-ui/icons'
import { Badge } from '@material-ui/core'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'


function Navbar() {

  const navigate = useNavigate();

  const [query, setQuery] = useState('');

  return (
    <div>
      <div className="nav-container">
          <div className="nav-wrapper">
              <div className="nav-left">
                  <div className="search-container">
                      <input 
                        type="text"
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            navigate('/products', {state: query});
                          }
                            
                            // < Link to ={{
                            //   pathname: '/products',
                            //   state: query
                            // }}/>
                          }}
                      />
                      <Search style={{color: "gray", fontSize: 16}}/>
                  </div>
              </div>
              <div className="nav-center">
                <Link to = '/' className='link-home'>
                  <h1>Lee.</h1>
                </Link>
                  
              </div>
              <div className="nav-right">

                  <Link to ="/products" className='nav-link menu-item'>
                    <div>PRODUCT</div>
                  </Link>                
                  <Link to ="/login" className='nav-link menu-item'>
                    <div>LOGIN</div>
                  </Link>

                  <div className="menu-item">
                    <Badge color="primary">
                      <ShoppingCartOutlined/>
                    </Badge>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Navbar