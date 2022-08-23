import * as React from 'react';
import AppBar from '@mui/material/AppBar';
// import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';



// defining the styles for the Navbar component
const drawerWidth = 240;


//main Functional Component

function Header(props) {


  // defining the state for the Navbar component and the useEffect hook and the useNavigate hook
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { dispatch } = useAuthContext()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  // function to handle the drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // function to handle the logout button

  const handleLogout = () => {
    // fetch('http://localhost:3001/api/auth/logout')
    // .then(res => res.json())
    // .then(data => {
    //   console.log(data);
    // })
    setIsLoggedIn(false);
    localStorage.clear();
    dispatch({type:'LOGOUT'})
    navigate('/');
  }


  // UseEffect to check if user is logged in
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  })
   
  // rendering the drawer components
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link to="/" style={{ textDecoration:'none'}}>Shopy</Link>
      </Typography>
      <Divider />
      {
        !isLoggedIn ? 
        <>
          <List>
          <ListItem  disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary='Home' onClick={()=>{navigate('/')}}/>
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary='Login' onClick={()=>{navigate('/login')}}/>
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary='Register' onClick={()=>{navigate('/register')}}/>
              </ListItemButton>
            </ListItem>
          </List>
        </>
        :
        <>
          <List>
            <ListItem  disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary='Home'/>
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary='Logout' onClick={handleLogout}/>
              </ListItemButton>
            </ListItem>
          </List>
        </>
      }
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
    

  // rendering the Navbar components
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: {xs:'none',sm:'block', md:'block' } }}
          >
            <Link to="/" style={{textDecoration:'none' ,color:'white'}}>Shopy</Link>
          </Typography>
          {
            isLoggedIn ?
            <>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button  sx={{ color: '#fff' }}>
                    <Link to="/" style={{color: 'white',textDecoration: 'none',cursor: 'pointer',fontSize:'12px'}}>Home</Link>
                </Button>
                <Button  sx={{ color: '#fff' }}>
                  <Link to="/" style={{color: 'white',textDecoration: 'none',cursor: 'pointer',fontSize:'12px'}} onClick={handleLogout}>Logout</Link>
                </Button>
              </Box>
            </>
            : 
            <>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button  sx={{ color: '#fff' }}>
                  <Link to="/" style={{color: 'white',textDecoration: 'none',cursor: 'pointer'}}>Home</Link>
                </Button>
                <Button  sx={{ color: '#fff' }}>
                  <Link to="/login" style={{color: 'white',textDecoration: 'none',cursor: 'pointer'}}>Login</Link>
                </Button>
                <Button  sx={{ color: '#fff' }}>
                  <Link to="/register" style={{color: 'white',textDecoration: 'none',cursor: 'pointer'}}>Register</Link>
                </Button>
              </Box>
            </>
          }
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Header;