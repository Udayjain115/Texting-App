import React from 'react';
import ModernButton from '../components/ModernButton';
import { Row, Col, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
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
              text="Login"
              handleClick={handleLogin}
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
    </Container>
  );
};

export default LandingPage;
