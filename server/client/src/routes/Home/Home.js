import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

function Home(){
    const { isAuthenticated } = useSelector(state => state.auth);
    const navigate = useNavigate();
    
    return(
        <div>
            <h1>ESTOY EN HOME</h1>
            <div>
          { !isAuthenticated &&
            <div>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
            </div>
          }
          { isAuthenticated &&
            <Button color="inherit" onClick={() => navigate('/account')}>Perfil</Button>
          }
        </div>
        </div>
    );
}

export default Home;