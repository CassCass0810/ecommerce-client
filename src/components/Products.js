import React, {useState} from "react"
import Swal from "sweetalert2"
import EditProduct from "./forms/EditProduct"

function Products({data, getProducts}) {
    let [cartItem, setCartItem] = useState({})
    let [ editing, setEditing ] = useState(false)

    let onChangeHandler = (e) => {
        setCartItem({...cartItem, [e.target.name]: e.target.value}) //capture what is being type in quantity box
    }

    let onSubmitHandler = (e, id) => {
        e.preventDefault()
        //alert('Add to cart ' + id)
        cartItem.itemId = id
        cartItem.quantity = parseInt(cartItem.quantity)
        fetch(`${process.env.REACT_APP_API_URL}/cart/`, {
            method: 'POST',
            headers: {
                'Content-Type' : "application/json",
                'x-auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify(cartItem)
        })
        .then(res => res.json())
        .then(data => Swal.fire(data.msg))
    }

    let showProducts = data.map(product => {

        let deleteHandler = (productId) => {
            //alert('Delete cart item!' + productId)
            //console.log(productId)

            Swal.fire({
                'title' : 'Are you sure?',
                'text' : 'You wont be able to revert this!',
                'icon' : 'warning',
                'showCancelButton' : '#3085d6',
                'cancelButtonColor' : '#d33',
                'confirmButtonText' : 'Yes, delete it!'
            }).then( result => {
                if(result.isConfirmed) {
                    //fetch
                    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
                        method: 'Delete',
                        headers: {"x-auth-token": localStorage.getItem('token')}
                    })
                    .then(res => res.json())
                    .then(data => {
                        Swal.fire('Deleted!', data.msg, 'success')
                        getProducts()
                    })
                }
            })
        }



        return(
            <div className="col-md-4">
                <div className="card">
                    <img src={`${process.env.REACT_APP_API_URL}/${product.image.split("/")[2]}`} alt=""/>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <strong>RM: {product.price}</strong>

                        <form onSubmit={(e) =>  onSubmitHandler(e, product._id)}>
                            <div class="input-group">
                                <input type="number" className="form-control" 
                                name="quantity" onChange={onChangeHandler}/>
                                <button className="btn btn-success" type="submit">Add To Cart</button>
                            </div>
                        </form>

                        {/* only show if admin */}
                        {/* <button className="btn btn-warning">Edit</button>
                        <button className="btn btn-danger" onClick={() => deleteHandler(product._id)}>Delete</button> */}

                        {
                            localStorage.hasOwnProperty('token') && JSON.parse(localStorage.getItem('userData')).isAdmin === true ?
                            <div className="my-3">
                                {/* {
                                    editing ? <EditProduct data={product._id} updatedProduct={updateProduct} />:
                                        <>
                                            <h3>{product.name}</h3>
                                            <p>{product.quantity}</p>
                                            <p>{product.price}</p>
                                            <p>{product.description}</p>
                                        </>
                                }
                            {
                            <button className="btn btn-warning" onClick={() => setEditing(!editing)}>Edit</button>

                            } */}

                                    {
                                        editing ? 
                                        <EditProduct data={product}  key={data._id} setEditing={setEditing}/> :
                                        <></>
                                    }
                                    
                                    <button className="btn btn-warning" onClick={()=> setEditing(!editing)}>
                                        {editing? "Cancel" :"Edit"}
                                    </button>

                            <button className="btn btn-danger" onClick={() => deleteHandler(product._id)}>Delete</button>
                            </div>
                            :
                            <></>
                        } 

                    </div>
                </div>
            </div>
        )
    })
    return(
        <div className="container my-5">
            <h2>All Products</h2>
            <div className="row">
                {showProducts}
                {/* {data.length ? showProducts : <h2>No products to show</h2>} */}
            </div>
        </div>
    )
}

export default Products