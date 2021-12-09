import React, {useState, useEffect} from "react"
import {Accordion} from "react-bootstrap"

function Orders() {
    let [orders, setOrders] = useState([])

    let getOrders = () => {
        fetch(`${process.env.REACT_APP_API_URL}/orders`,{
            headers: {"x-auth-token": localStorage.getItem('token')}
        })
        .then( res => res.json())
        .then( data => setOrders(data))
    }

    useEffect( () => {
        getOrders()
    }, [])

    let showOrders = 
    orders.length ? 
        orders.map(order => {
            return(
                <Accordion.Item eventKey={order._id}>
                    <Accordion.Header>{order.purchased_date}</Accordion.Header>
                    <Accordion.Body>
                        {
                        order.items.map(item => {
                            return(
                                <h5>
                                    {item.name}-{item.quantity}-{item.price}-{item.subtotal}
                                </h5>
                            )
                        }

                        )}
                        <h5>RM {order.total}</h5>
                    </Accordion.Body>
                </Accordion.Item>
            )
        })
        :
        <h2>No orders to show</h2>

    return(
        <div className="container py-5">
            <Accordion>
                {showOrders}
            </Accordion>
        </div>
    )
}

export default Orders