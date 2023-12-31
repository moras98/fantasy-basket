import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';

//actions
// import { checkLoginStatus } from '../store/auth/Auth.actions';

//components
import Home from '../routes/Home/Home';
import Login from '../routes/Login/Login';
import Teams from '../routes/Teams/Teams';
import Account from '../routes/Account/Account';
import TeamInfo from '../routes/TeamInfo/TeamInfo';
// import { isLoggedIn } from '../apis/auth';
import Players from '../routes/Players/Players';
import PlayerInfo from '../routes/PlayerInfo/PlayerInfo';
import GameStats from '../routes/GameStats/GameStats';
import Header from './Header/Header';
import UsersTeams from '../routes/UsersTeams/UsersTeams';
import Register from '../routes/Register/Register';
import Games from '../routes/Games/Games';
import MyTeam from '../routes/MyTeam/MyTeam';


function App() {
  // const dispatch = useDispatch();
  const loggedInStatus = useSelector(state=>state.auth.isAuthenticated);

  return (
    <div style={{flex: 1}} className='App'>
      <Router>
        <Header />
          <Routes>
            {/* Public Routes */}
            <Route  path='/' element={<Home/>} />
            <Route  path='/login' element={<Login/>} />
            <Route  path='/register' element={<Register/>} />
            <Route  path='/teams' element={<Teams/>} />
            <Route path='/teams/:teamId' element={<TeamInfo/>} />
            <Route  path='/players' element={<Players/>} />
            <Route path='/players/:playerId' element={<PlayerInfo/>} />
            <Route  path='/games/' element={<Games/>}/>
            <Route  path='/games/:gameId' element={<GameStats/>}/>
            <Route path='/leaderboard' element ={<UsersTeams/>} />
            {/* Private Routes */}
            <Route path='/myTeam/' element ={loggedInStatus ? (<MyTeam/>): (<Navigate to='/login' replace/>)} />           
          </Routes>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8244428999939750"
     crossorigin="anonymous"></script>
      </Router>
    </div>
  );
}

export default App;
