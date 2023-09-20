import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import TextField from '../../components/TextField/TextField';

import './Login.css';

import { loginUser } from '../../store/auth/Auth.actions';

import * as Yup from 'yup';
import { Alert } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false); 

  // Login handler
  const handleLogin = async (credentials) => {
    try {
      setIsLoading(true);
      await dispatch(loginUser(credentials));
      setIsLoading(false);
      navigate('/');
    } catch(err) {
      setShowError(true); 
      setIsLoading(false);
    }
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo inválido")
      .required("Ingrese un correo válido"),

    password: Yup.string()
      .required("Ingrese una contraseña")
  })

  return (
    <div className="app">
      <div>
      {showError && <Alert severity="error" onClose={()=>{setShowError(false)}}>Email y/o contraseña incorrectas</Alert>}
      </div>
      <div className="formComp">
        <div className="formWrapper">
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={loginSchema}
            validateOnBlur
            onSubmit={async (values) => {
              const { email, password } = values;
              await handleLogin({username: email, password});
            }}
          >
            <Form className="baseForm">
              <header className="baseFormHeader">
                <h1 className="baseFormHeading" style={{color: 'black'}}>Iniciar Sesión</h1>
              </header>
              <TextField
                label="Email"
                name="email"
                id="email-input"
              />
              <TextField
                label="Password"
                name="password"
                id="password-input"
                type="password"
              />
              {
                error && <div>{error}</div>
              }
              <Button variant="contained" color="primary" type="submit" isLoading={isLoading}>Enviar</Button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;