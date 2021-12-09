import React,{useState} from "react"
import Swal from "sweetalert2"
import {
    Container,
    Row,
    Col,
    Form,
    Button
} from "react-bootstrap"

function AddProduct() {
    const [product, setProduct] = useState({})
    const onChangeHandler = (e) => {
        setProduct({...product, [e.target.name]: e.target.value})
    }

    const imageHandler = (e) => {
        setProduct({...product, image: e.target.files[0]});
    }
    const onSubmitHandler = (e) => {
    e.preventDefault()

    let formData = new FormData()

    formData.append('name', product.name);
    formData.append('quantity', product.quantity);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('image', product.image);

    fetch(`${process.env.REACT_APP_API_URL}/products`, {
        method: "POST",
        headers: {
            "x-auth-token": localStorage.getItem('token')
        },
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        Swal.fire(data.msg)
        //getProducts()
    })
}
return(

<Container>
<Row>
    <Col md="6">
    <h2>Add Product</h2>
        <Form method="POST" onSubmit={onSubmitHandler} encType="multipart/form-data"> 

        {/* {JSON.stringify(product)} */}

            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" onChange={onChangeHandler}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" name="quantity" onChange={onChangeHandler}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" onChange={onChangeHandler}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" onChange={onChangeHandler}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" name="category" onChange={onChangeHandler}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" name="image" onChange={imageHandler} accept=".png, .jpg, .jpeg"/>
            </Form.Group>

            <Button type="submit" variant="success">Add Product</Button>

        </Form>
    </Col>
</Row>
</Container>
)
}

export default AddProduct