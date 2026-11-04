import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function MyNavbar() {

  const [username, setUsername] = useState("");
  useEffect(() => {
    fetch("http://localhost:5001/api/me", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) {
          setUsername(data.username);
        }
      })
      .catch(error => console.error(error));
  }, []);
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as= {Link} to="/"> Trainova</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as= {Link} to="/">Home</Nav.Link>
            <Nav.Link as= {Link} to="/clients">Clients</Nav.Link>
            {username ? (
            <p>Welcome, {username}</p>
            ) : (
            <Nav.Link as= {Link} to="/login">login</Nav.Link>
            )}
            
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;