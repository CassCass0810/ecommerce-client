import React from "react"
import { Navbar, Container, Nav, Badge} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

function TopNav({handleLogout}) {

    let navigate = useNavigate()

    return(
    <Navbar expand="md" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">ASDFG</Navbar.Brand>
            <Navbar.Collapse id="menu">
                <Nav>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    {
                        localStorage.hasOwnProperty('token') && localStorage.hasOwnProperty?
                        <>
                            <Nav.Link as={Link} to="/cart">
                                Cart
                                <Badge bg="primary">0</Badge>
                                </Nav.Link>

                                <Nav.Link as={Link} to="/orders">Orders</Nav.Link>

                            <Nav.Link onClick={() => {
                                handleLogout()
                                navigate("/")
                            }}>Logout</Nav.Link>
                        </>
                        :
                        <>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link> 
                        </>
                    }
                    {/* <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    <Nav.Link>Cart</Nav.Link>
                    <Nav.Link>Logout</Nav.Link> */}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default TopNav