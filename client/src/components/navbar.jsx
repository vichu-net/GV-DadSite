import React from "react";
import { useNavigate } from "react-router-dom";
import '../assets/style/navbar.css'; // Your sidebar styles
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/dashboard">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/sales">Sales</Nav.Link>
            <Nav.Link href="/inventory">Inventory</Nav.Link>
            <Nav.Link href="/customers">Customers</Nav.Link>
            <Nav.Link href="/reports">Reports</Nav.Link>
            <Nav.Link href="/settings">Settings</Nav.Link>
            <Nav.Link href="/logout" onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Container>
    </Navbar>
  );
}

export default NavBar;
