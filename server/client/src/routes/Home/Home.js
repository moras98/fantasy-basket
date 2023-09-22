import React from 'react';
import './Home.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Button, Stack} from '@mui/material'

function Home(){
    const { isAuthenticated } = useSelector(state => state.auth);
    const navigate = useNavigate();
    
    return(
        <section className='home-section'>
            <div className='sub-container'>
              <div>
                <h1>FANTASY FUBB</h1>
              </div>
            { !isAuthenticated &&
              <Stack spacing={2} direction={'row'}>
                <Button sx={{height: 75, 
                  width: 200, 
                  backgroundColor: "#ff9738", 
                  color: "#1b1e1d", 
                  fontWeight: "bold",
                  fontSize: '1rem',
                  border: "1px solid #ff9738",
                  '&:hover': {backgroundColor: '#1b1e1d', border: "1px solid #ff9738", color: "#ff9738"}
                  }} variant='contained' onClick={() => navigate('./login')}>Iniciar Sesíon</Button>
                <Button sx={{height: 75, 
                  width: 200, 
                  borderColor: "#ff9738", 
                  color: "#ff9738", 
                  fontWeight: "bold",
                  fontSize: '1rem',
                  '&:hover': {color: '#1b1e1d', border: "1px solid #ff9738", backgroundColor: "#ff9738"}
                  }} variant='outlined' onClick={() => navigate('./register')}>Registrarse</Button>
              </Stack>
            }
            { isAuthenticated &&
              <Button sx={{height: 75, 
                width: 200, 
                backgroundColor: "#ff9738", 
                color: "#1b1e1d", 
                fontWeight: "bold",
                fontSize: '1rem',
                border: "1px solid #ff9738",
                '&:hover': {backgroundColor: '#1b1e1d', border: "1px solid #ff9738", color: "#ff9738"}
                }} variant='contained' onClick={() => navigate('./myteam')}>My Team</Button>
            }
            </div>
        </section>
    );
}

export default Home;