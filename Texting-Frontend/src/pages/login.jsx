import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
const login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorNotification, setErrorNotification] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorNotification('Please fill in all fields');
      setTimeout(() => {
        setErrorNotification(null);
      }, 5000);
      return;
    }

    try {
      const data = await userService.login({ email, password });
      console.log(data);

      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      console.log(error);
      setErrorNotification('Invalid email or password');
      setTimeout(() => {
        setErrorNotification(null);
      }, 5000);
    }
  };
  const fields = [
    { label: 'Email', type: 'email', name: 'email', value: email },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      value: password,
    },
  ];

  const buttons = [{ text: 'Log in', handle: handleSubmit }];

  return (
    <>
      <Container className="vh-100 d-flex flex-column justify-content-center">
        <Row>
          <h1 className="text-center mb-5">Login</h1>
        </Row>
        <Row>
          <Col
            lg={6}
            md={6}
            sm={6}
            className="mx-auto"></Col>
        </Row>
        <Row>
          <Col
            lg={6}
            md={6}
            sm={6}
            className="mx-auto">
            <form
              className="display-flex align-items-center"
              onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div
                  className="mb-3"
                  key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="form-label">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    className="form-control"
                    id={field.name}
                    value={field.value}
                    onChange={(e) => {
                      if (field.name === 'email') {
                        setEmail(e.target.value);
                      } else if (field.name === 'password') {
                        setPassword(e.target.value);
                      } else {
                        setFirstName(e.target.value);
                      }
                    }}
                  />
                </div>
              ))}
              {buttons.map((button) => (
                <div
                  className="text-center"
                  key={button.text}>
                  <button
                    type="submit"
                    className="btn btn-primary">
                    {button.text}
                  </button>
                </div>
              ))}
            </form>
          </Col>
        </Row>
        <Row>
          <div className="d-inline d-flex justify-content-center mt-2">
            {errorNotification && (
              <div className="alert alert-danger">{errorNotification}</div>
            )}
          </div>
        </Row>
        <Row>
          <div className="d-inline d-flex justify-content-center mt-2">
            <p>
              Dont Have An Account?{' '}
              <Link
                to="/login"
                className="text-decoration-none text-btn">
                <span className="lead fw-bold ">Create One Here</span>
              </Link>
            </p>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default login;
