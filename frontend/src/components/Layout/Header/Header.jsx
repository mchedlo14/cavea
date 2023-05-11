import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/')
    }
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand onClick={handleNavigate} className='pointer'>Movie List</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate('/')}>მთავარი</Nav.Link>
                        <Nav.Link onClick={() => navigate('/add')}>დაამატე ფილმმი</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header