// import React,{useState, useEffect} from "react"
// import Swal from "sweetalert2"
// import {
//     Container,
//     Row,
//     Col,
//     Form,
//     Button
// } from "react-bootstrap"

// function EditProduct({data, product}) {
//     const [product, setProduct] = useState(product)

//     const onChangeHandler = (e) => {
//         setProduct({...product, [e.target.name]: e.target.value})
//     }

//     const imageHandler = (e) => {
//         setProduct({...product, image: e.target.files[0]});
//     }

//     const onSubmitHandler = (e, productId) => {
//         e.preventDefault()
//         //console.log(productId)

//         //let productId = e.target.nextElementSibling.value
    
//         let formData = new FormData()
    
//         formData.set('name', product.name);
//         formData.set('quantity', product.quantity);
//         formData.set('price', product.price);
//         formData.set('description', product.description);
//         formData.set('category', product.category);
//         formData.set('image', product.image);
    
//         fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
//             method: "PUT",
//             headers: {
//                 "x-auth-token": localStorage.getItem('token')
//             },
//             body: formData
//         })
//         .then(res => res.json())
//         .then(data => {
//             Swal.fire(data.msg)
//             //setEditing(false)
//             //getProducts()
//         })
//     }
//     return(
    
//     <Container>
//     <Row>
//         <Col md="6">
//         <h2>Edit Product</h2>
//             <Form method="PUT" onSubmit={(e) =>  onSubmitHandler(e, product._id)} encType="multipart/form-data"> 
    
//             {/* {JSON.stringify(product)} */}
    
//                 <Form.Group>
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control type="text" name="name" onChange={onChangeHandler}/>
//                 </Form.Group>
    
//                 <Form.Group>
//                     <Form.Label>Quantity</Form.Label>
//                     <Form.Control type="number" name="quantity" onChange={onChangeHandler}/>
//                 </Form.Group>
    
//                 <Form.Group>
//                     <Form.Label>Price</Form.Label>
//                     <Form.Control type="number" name="price" onChange={onChangeHandler}/>
//                 </Form.Group>
    
//                 <Form.Group>
//                     <Form.Label>Description</Form.Label>
//                     <Form.Control type="text" name="description" onChange={onChangeHandler}/>
//                 </Form.Group>
    
//                 <Form.Group>
//                     <Form.Label>Category</Form.Label>
//                     <Form.Control type="text" name="category" onChange={onChangeHandler}/>
//                 </Form.Group>
    
//                 <Form.Group>
//                     <Form.Label>Image</Form.Label>
//                     <Form.Control type="file" name="image" onChange={imageHandler} accept=".png, .jpg, .jpeg"/>
//                 </Form.Group>
    
//                 <Button type="submit" variant="success">Edit Product</Button>
    
//             </Form>
//         </Col>
//     </Row>
//     </Container>
//     )

// }

// export default EditProduct

import React, { useState } from 'react'
import Swal from 'sweetalert2'

function EditProduct({data, setEditing}) {
  // console.log(data)
  const [ product, setProduct ] = useState({
    id: data._id,
    name: data.name,
    quantity: data.quantity,
    price: data.price,
    description: data.description,
    category: data.category,
    image: data.image
  })
  const [ image, setImage ] = useState({})

  let onChangeHandler = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }
  
  console.log(product)
  
  let onSubmitHandler = (e, id) => {
    e.preventDefault()
    // alert(id)

    let imageData = document.getElementById('img').files[0]
    console.log(imageData)

    let formData = new FormData()
    formData.append('name', product.name)
    formData.append('quantity', product.quantity)
    formData.append('price', product.price)
    formData.append('description', product.description)
    formData.append('category', product.category)
    formData.append('image', imageData)

    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        'x-auth-token': localStorage.getItem('token')
      },
      body: formData
    })
    .then(res => res.json())
    .then(data => {
          Swal.fire(data.msg)
    })
    setEditing(false)
  }

  let imageHandler = (e) => {
    e.preventDefault()
    setImage({file: e.target.files[0]})
  }

  return (
    <form onSubmit={(e) => onSubmitHandler(e, data._id)} method="POST" encType="multipart/form-data">
      { JSON.stringify(image) }
      <h2> Update Product </h2>
      <div>
        <label>Name: </label>
        <input type="text" className="form-control" name="name" onChange={onChangeHandler} value={product.name} />
      </div>

      <div>
        <label>Quantity: </label>
        <input type="number" className="form-control" name="quantity" onChange={onChangeHandler} value={product.quantity} />
      </div>

      <div>
        <label>Price: </label>
        <input type="number" className="form-control" name="price" onChange={onChangeHandler} value={product.price} />
      </div>

      <div>
        <label>Description: </label>
        <input type="text" className="form-control" name="description" onChange={onChangeHandler} value={product.description} />
      </div>

      <div>
        <label>Category: </label>
        <input type="text" className="form-control" name="category" onChange={onChangeHandler} value={product.category} />
      </div>

      <div>
        <label>Files: </label>
        <input type="file" name="image" className="form-control" id="img" onChange={imageHandler} />
      </div>

      <button type="submit" className="btn btn-primary">Confirm Changes</button>
    </form>
  )
}

export default EditProduct