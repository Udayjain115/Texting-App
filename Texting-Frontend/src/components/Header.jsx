import React, { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ModernButton from './ModernButton';

const Header = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginOrLogout = () => {
    if (isLoggedIn) {
      logout();
    } else {
      navigate('/login');
    }
  };
  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="mb-4">
      <Container fluid>
        <Navbar.Brand href="/">Texting App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && (
              <>
                <Nav.Link
                  as={Link}
                  to="/profile">
                  Profile
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="d-flex align-items-center gap-3">
            {isLoggedIn && (
              <span className="text-light">Welcome, {user.firstName}</span>
            )}
            <ModernButton
              text={isLoggedIn ? 'Logout' : 'Login'}
              handleClick={handleLoginOrLogout}
            />
            {!isLoggedIn && (
              <ModernButton
                text="Sign Up"
                handleClick={handleSignUp}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
