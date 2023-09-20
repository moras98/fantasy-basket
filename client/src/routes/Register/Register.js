import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import { Divider } from '@mui/material';
import TextField from '../../components/TextField/TextField';

import '../Login/Login.css';
// import { registerUser } from '../../store/auth/Auth.reducers';
import { registerUser } from '../../store/auth/Auth.actions';

import * as Yup from 'yup';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  // Registration handler
  const handleRegister = async (credentials) => {
    try {
      setIsLoading(true);
      await dispatch(registerUser(credentials));
      setIsLoading(false);
      navigate('/login')
    } catch(err) {
      setIsLoading(false);
    }
  }

  // Validation schema for registration form
  const registrationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo inválido")
      .required("Email rquerido"),

    password: Yup.string()
      .required("Contraseña requerida"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Contraseñas deben coincidir")
  })

  return (
    <div className="app">
      <div className="formComp">
        <div className="formWrapper">
          <Formik
            initialValues={{email: '', username:'',password: '', confirmPassword: ''}}
            validationSchema={registrationSchema}
            validateOnBlur
            onSubmit={async (data) => {
              const { confirmPassword, ...credentials } = data;
              await handleRegister(credentials);
            }}
          >
            <Form className="baseForm">
              <header className="baseFormHeader">
                <h1 className="baseFormHeading" style={{color: 'black'}}>Register</h1>
              </header>
              <TextField
                label="Email"
                name="email"
                id="email-input"
              />
              <TextField
                label="Username"
                name="username"
                id="usename-input"
              />
              <TextField
                label="Password"
                name="password"
                id="password-input"
                type="password"
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                id="confirm-password-input"
                type="password"
              />
              {
                error && <div>{error}</div>
              }
              <Button variant="contained" color="primary" type="submit" isLoading={isLoading}>Registrarse</Button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register;