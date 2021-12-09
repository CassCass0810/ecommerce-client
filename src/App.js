import React, {useState, useEffect} from "react"
import Product from "./components/Product"
import TopNav from "./components/partials/Navbar"
import {Routes, Route} from "react-router-dom"
import Register from "./components/forms/Register"
import Login from "./components/forms/Login"
import jwt_decode from "jwt-decode"
import Cart from "./components/Cart"
import AddProduct from "./components/forms/AddProduct"
import Products from "./components/Products"
import Orders from "./components/Orders"
import {
  Form,
  InputGroup
} from "react-bootstrap"

function App() {

  const [products, setProducts] = useState([])
  const [token, setToken] = useState("")
  const [userData, setUserData] = useState({})
  let [keyword, setKeyword] = useState("")

  let getProducts = () => {
    fetch('localhost:4000/products/')
    .then(res => res.json())
    .then(data => setProducts(data))
  }

  // let searchedProducts = (e) => {
  //   setKeyword(e.target.value)
  //   fetch(`${process.env.REACT_APP_API_URL}/products/search/${keyword}`)
  //   .then( res => res.json())
  //   .then(data => setProducts(data))
  // }

  // let searchedProducts = (e) => {
  //   setKeyword(e.target.value)
  //   if(keyword === "") return setProducts()
  //   else {
  //     fetch(`${process.env.REACT_APP_API_URL}/products/search/${keyword}`)
  //     .then(res => res.json())
  //     .then(data => setProducts(data))
  //   }
  // }

  // let searchedProducts = (e) => {
  //   setKeyword(e.target.value)
  //   e.preventDefault()
  //   fetch(`${process.env.REACT_APP_API_URL}/products/search/`+keyword.search, {
  //     method: "GET"
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     data.length ?
  //     setProducts(data)
  //     :
  //     getProducts()
  //   })
  // }

  let onChangeHandler = (e) => {
    setKeyword({...keyword, [e.target.name]: e.target.value})
  }
  // console.log(key.key)


  let onSubmitHandler = (e) => {
    // alert('ds')
    e.preventDefault()
    fetch(`${process.env.REACT_APP_API_URL}/products/search/`+ keyword.keyword, {
      method:"GET" 
    })
    .then (res => res.json() )
    .then (data => { 
      data.length ? 
      setProducts(data) 
      : getProducts() 
    })
  }

  useEffect( ()=> {
    getProducts()
  }, [])
  // console.log(products)

  //let showProducts = products.map(product => <Product key={product._id} data={product}/>)

  let handleLogin = (data) => {
    let decoded = jwt_decode(data)
    setToken(data)
    setUserData(decoded)

    localStorage.setItem('userData', JSON.stringify(decoded))
    localStorage.setItem('token', data)
  }

  let handleLogout = () => {
    setToken()
    setUserData({})
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
  }

  // let parseData = (JSON.parse(localStorage.getItem('userData')))
  //console.log(parseData.isAdmin)
  let trueCheck = () => {
    let adminCheck = JSON.parse(localStorage.getItem('userData'))
    let isAdmin = adminCheck.isAdmin
    if(isAdmin) {
      return <AddProduct />
    }
  }

  return (
    <div className="App">
      <TopNav handleLogout={handleLogout}/>
      {/* {showProducts} */}
      {/* only show the add product if you are the admin and you are logged in */}
      {/* {parseData.isAdmin ? 
      <AddProduct/>
      :
      <>
      </>
      }
      <AddProduct/> */}

      <Form onSubmit={onSubmitHandler}>
          <InputGroup>
            <Form.Control type="text" name="keyword" onChange={onChangeHandler} />
            <button className="btn btn-secondary">Search</button>
          </InputGroup>
        </Form>


      {
        //Only if admin
          localStorage.hasOwnProperty('userData') && localStorage.hasOwnProperty('token')?
          trueCheck()
          :
          <>
          </>
                
        }
        {/* <input type="text" className="mt-4 ms-5 col-md-8" onChange={searchedProducts} placeholder="Search for products..."/>
        <button className="btn btn-secondary">Search</button> */}

        {/* <Form onSubmit={onSubmitHandler}>
          <InputGroup>
            <Form.Control type="text" name="keyword" onChange={onChangeHandler} />
            <button className="btn btn-secondary">Search</button>
          </InputGroup>
        </Form> */}
      
      {/* <input searchedProduct={searchedProduct}>Search Here</input> */}
      {/* <input onChange={searchedProduct}></input> */}
      <Routes>
        <Route path="/" element={<Products data={products} getProducts={getProducts}/> }/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login handleLogin={handleLogin}/>} />
      </Routes>
    </div>
  );
}

export default App;