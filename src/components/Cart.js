import React, {useEffect, useState} from "react"
import Swal from "sweetalert2"
import StripeCheckout from "react-stripe-checkout"

function Cart() {
    let [cartItems, setCartItems] = useState({})
    //let [newQuantity, setNewQuantity] = useState({})

    let getCart = () => {
        fetch(`${process.env.REACT_APP_API_URL}/cart`, {
            method: "GET",
            headers: {
                "x-auth-token": localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => setCartItems(data))
    }
    useEffect( () => {
        getCart()
    }, [])

    let onChangeHandler = (e) => {
        e.target.parentElement.requestSubmit()
        //alert('Form Submitted')

        //new quantity 
        let newQuantity = e.target.value

        //itemId
        let itemId = e.target.nextElementSibling.value
        //setNewQuantity({...newQuantity, [e.target.name]: itemId})

        //alert(newQuantity, itemId)
        //alert(setNewQuantity)
        e.preventDefault()
        fetch(`${process.env.REACT_APP_API_URL}/cart/${itemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                "quantity" : newQuantity
            })
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire(data.msg)
            getCart()
            //setEditing(false)
        })
    }

    // let onSubmitHandler = (e) => {
    //     e.preventDefault()
    //     fetch(`${process.env.REACT_APP_API_URL}/cart/${itemId}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "x-auth-token": localStorage.getItem('token')
    //         },
    //         body: JSON.stringify(newQuantity)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         Swal.fire(data.msg)
    //         getItems()
    //         setEditing(false)
    //     })
    //     }

    let onSubmitHandler = (e) => {
            e.preventDefault()
        
            }

    //Delete single item in the Cart
    let deleteHandler = (itemId) => {
        //alert('Delete cart item!' + itemId)
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
                fetch(`${process.env.REACT_APP_API_URL}/cart/${itemId}`, {
                    method: 'Delete',
                    headers: {"x-auth-token": localStorage.getItem('token')}
                })
                .then(res => res.json())
                .then(data => {
                    Swal.fire('Deleted!', data.msg, 'success')
                    getCart()
                })
            }
        })
    }

    let emptyCart = () => {
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
                fetch(`${process.env.REACT_APP_API_URL}/cart`, {
                    method: 'Delete',
                    headers: {"x-auth-token": localStorage.getItem('token')}
                })
                .then(res => res.json())
                .then(data => {
                    Swal.fire('Deleted!', data.msg, 'success')
                    getCart()
                })
            }
        })
    }

    let displayCartItems = cartItems.items?.map(item => {
        return (<tr key = {item.itemId}>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>
                {/* <form onSubmit={onSubmitHandler} method="PUT"> */}
                <form onSubmit={onSubmitHandler} method="PUT">
                    <input type="number" name="quantity"
                    value={item.quantity} className="form-control" 
                    onChange={onChangeHandler}/>

                    <input type="hidden" name="itemId"
                    readOnly value={item.itemId}/>
                </form>
            </td>
            <td>{item.price * item.quantity}</td>
            <td>
                <button className="btn btn-danger" onClick={() => deleteHandler(item.itemId)}>Delete</button>
            </td>
        </tr> )
    })

    let userData = JSON.parse(localStorage.getItem('userData'))

    let tokenHandler = (token, address) =>{
        fetch(`${process.env.REACT_APP_API_URL}/orders`,{
        method: 'POST',
        headers: {"x-auth-token": localStorage.getItem('token')},
        body: JSON.stringify({
            token: token.id
        })
        })
        .then(res => res.json())
        .then(data => Swal.fire(data.msg))
    }

    return(
        <div>
            {cartItems.items ?
            <div className="container">
            <h2>My Cart</h2>
            <table className="table table-responsive">
                <thead className="thead-dark">
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {displayCartItems}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Total: {cartItems.total}</td>
                        <td>
                            <StripeCheckout 
                                stripeKey="pk_test_51K3uWVLmj8fxwEAkL3hSlV9Rn0r7J1hMs6BwuR0X1n21LedBgADBhTVmcScnR0Cjtg8dz7cb6PiZsaBMqDL65dPH00R3POsPoH"
                                amount={cartItems.total * 100}
                                currency="MYR"
                                name="Checkout your item(s)"
                                email={userData.email}
                                token={tokenHandler}
                            />
                        </td>
                        <td>
                            <button onClick={emptyCart} className="btn btn-danger">
                                Empty Cart
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
            </div>
            :
            <h2>Your Cart is Empty</h2>
             }
        </div>
    )
}

export default Cart

