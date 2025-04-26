import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import  {UseAuth } from '../context/Auth/AuthContext';
import  Grid  from '@mui/material/Grid';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';





function Navbar() {
  const{userName,isAuthentcated}=UseAuth();
 
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate=useNavigate();

  
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogin =()=>{
    navigate('/login')
   
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"100%",alignItems:"center"}}>
            <Box sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>
          <AdbIcon sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
           
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
             
            }}
          >
         Tech Hub
          </Typography>
          </Box>

       
         
        
          <Box sx={{ flexGrow: 0 }}>
            {isAuthentcated? (<>
              <Tooltip title="Open settings">
              <Grid container alignItems="center" justifyContent="center" gap={2}>
                <Grid item>
              <Typography>{userName}</Typography>
              </Grid>
              <Grid item>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userName || ''} src="/static/images/avatar/2.jpg" />
              </IconButton>
              </Grid>
              </Grid>
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
            >
             <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>My Order</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>LogOut</Typography>
                </MenuItem>
            </Menu>
            </>):(<Button variant='contained' color='success' onClick={handleLogin}>login</Button>
          )}
          
          </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
