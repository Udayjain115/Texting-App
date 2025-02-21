import React, { useContext } from 'react';
import ModernButton from '../components/ModernButton';
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LandingPage = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  console.log(user);
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
    // updated from Container to Container fluid so that the row takes up the full width of the container
    <Container fluid>
      <Row>
        <Col
          // Used Button Group to group the buttons together, gap to give them a gap
          className="btn-group d-flex justify-content-end gap-4 mt-3"
          role="toolbar">
          <div className="">
            <ModernButton
              text={isLoggedIn ? 'Logout' : 'Login'}
              handleClick={handleLoginOrLogout}
            />
          </div>
          <div className="">
            <ModernButton
              text="Join"
              handleClick={handleSignUp}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          {isLoggedIn && (
            <h1 className="text-center mt-5">Welcome to Texting App</h1>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
