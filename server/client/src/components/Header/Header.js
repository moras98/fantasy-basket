import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoginStatus, logoutUser } from '../../store/auth/Auth.actions';

export default function Header (){
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const loggedInStatus = useSelector(state=>state.auth.isAuthenticated);
  const user = useSelector(state=>state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    async function load() {
      await dispatch(checkLoginStatus());
    }

    load();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/');
      window.location.reload();
    } catch (error) {
      // Manejar errores, si es necesario
      console.error('Error al cerrar sesión', error);
    }
  };
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar position="static" sx={{backgroundColor: '#121212'}} elevation={5}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FANTASY FUBB
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={()=>{handleCloseNavMenu(); navigate('/teams')}}>
                <Typography textAlign="center">Equipos</Typography>
              </MenuItem>
              <MenuItem onClick={()=>{handleCloseNavMenu(); navigate('/players')}}>
                <Typography textAlign="center">Jugadores</Typography>
              </MenuItem>
              <MenuItem onClick={()=>{handleCloseNavMenu(); navigate('/games')}}>
                <Typography textAlign="center">Partidos</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FANTASY FUBB
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={()=>{handleCloseNavMenu(); navigate('/teams')}} sx={{ my: 2, color: 'white', display: 'block', backgroundColor: location.pathname.startsWith('/teams')? 'transparent': 'transparent' }}>Equipos</Button>
            <Button onClick={()=>{handleCloseNavMenu(); navigate('/players')}} sx={{ my: 2, color: 'white', display: 'block', backgroundColor: location.pathname.startsWith('/players')? 'transparent': 'transparent' }}>Jugadores</Button>
            <Button onClick={()=>{handleCloseNavMenu(); navigate('/games')}} sx={{ my: 2, color: 'white', display: 'block', backgroundColor: location.pathname.startsWith('/games')? 'transpaernt': 'transparent' }}>Partidos</Button>
            <Button onClick={()=>{handleCloseNavMenu(); navigate('/leaderboard')}} sx={{ my: 2, color: 'white', display: 'block', backgroundColor: location.pathname.startsWith('/leaderboard')? 'transpaernt': 'transparent' }}>Leaderboard</Button>
            <Button onClick={()=>{handleCloseNavMenu(); navigate('/myTeam')}} sx={{ my: 2, color: 'white', display: loggedInStatus ? 'block': 'none', backgroundColor: location.pathname.startsWith('/myTeam')? 'transpaernt': 'transparent' }}>My Team</Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Usuario">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Usuario"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            > <Typography textAlign="center" fontWeight="bold">{loggedInStatus? user?.username.toUpperCase(): ""}</Typography>
              <MenuItem onClick={()=>{handleCloseUserMenu(); navigate('/login')}} sx={{display: loggedInStatus? 'none':'block'}}><Typography textAlign="center">Iniciar Sesíon</Typography></MenuItem>
              <MenuItem onClick={()=>{handleCloseUserMenu(); navigate('/register')}} sx={{display: loggedInStatus? 'none':'block'}}><Typography textAlign="center">Registrarse</Typography></MenuItem>
              <MenuItem onClick={()=>{handleCloseUserMenu(); handleLogout()}} sx={{display: loggedInStatus? 'block':'none'}}><Typography textAlign="center">Cerrar Sesíon</Typography></MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}