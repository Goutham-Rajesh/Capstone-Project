import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

interface ResponsiveAppBarProps {
  pages: string[];
  isLoggedIn: boolean; // New prop for user login status
}

const settings = ['Profile', 'Payment Details', 'Bid Details', 'Logout'];

function ResponsiveAppBar({ pages, isLoggedIn }: ResponsiveAppBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [activePage, setActivePage] = React.useState<string>(pages[0]);
  const [user,setUser]=React.useState<string>('');
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const getUser = async () => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    if (token && userId) {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setUser(response.data.profilePic);
            console.log(response.data.profilePic);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
};

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuItemClick = (page: string) => {
    setActivePage(page);
    handleCloseNavMenu();
    switch (page) {
      case 'Home':
        navigate('/');
        break;
      case 'Chit Group':
        navigate('/ChitFund');
        break;
      case 'About':
        navigate('/about');
        break;
      case 'Create Chit':
        navigate('/createChitfund');
        break;
      case 'Active Chit':
        navigate('/ChitCreator');
        break;
      case 'Login':
        navigate('/Login');
        break;
      case 'Register':
        navigate('/Register');
        break;
      case 'Profile':
        navigate('/UserProfile');
        break;
      case 'Creator Bid Info':
        navigate('/CreatorBidPage');
        break;
      case 'Bid Info':
        navigate('/UserBidPage');
        break;
      case 'Member Info':
        navigate('/MembersInfo');
        break;
      default:
        break;
    }
  };

  const handleCloseUserMenu = (setting: string) => {
    setAnchorElUser(null);
    switch (setting) {
      case 'Profile':
        navigate('/UserProfile'); // Navigate to UserProfile
        break;
      case 'Payment Details':
        navigate('/PaymentDetails'); // Assuming you have this route
        break;
      case 'Bid Details':
        navigate('/BidDetails'); // Assuming you have this route
        break;
      case 'Logout':
        navigate('/logout')
        // Handle logout logic here, e.g., clear user session
        break;
      case 'Chit Bid Info':
        navigate('/CreatorBidPage');
        break;
      case 'Bid Info':
        navigate('/UserBidPage');
        break;
      case 'Member Info':
        navigate('/MembersInfo');
        break;
      default:
        break;
    }
  };

  // Update activePage based on current location
  React.useEffect(() => {
    const path = location.pathname;
    const currentPage = pages.find(page => {
      return (
        (page === 'Home' && path === '/') ||
        (page === 'Chit Group' && path === '/ChitFund') ||
        (page === 'About' && path === '/about') ||
        (page === 'Create Chit' && path === '/createChitfund') ||
        (page === 'Active Chit' && path === '/ChitCreator') ||
        (page === 'Login' && path === '/Login') ||
        (page === 'Register' && path === '/Register')||
        (page === 'Profile' && path === '/UserProfile')||
        (page === 'Creator Bid Info' && path === '/CreatorBidPage')||
        (page === 'Bid Info' && path === '/UserBidPage')||
        (page === 'Member Info' && path === '/MembersInfo')
      );
    });

    if (currentPage) {
      setActivePage(currentPage);
    } else {
      setActivePage('Home'); // Default to Home if no match is found
    }

    getUser();
  }, [location, pages]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ChitLInk
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleMenuItemClick(page)}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleMenuItemClick(page)}
                sx={{
                  my: 2,
                  color: activePage === page ? 'black' : 'white',
                  display: 'block',
                  backgroundColor: activePage === page ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* Replace Avatar with an img tag */}
                <img
                  src={user} // Update with the correct image path
                  alt="User Avatar"
                  style={{
                    width: '40px', // Adjust size as needed
                    height: '40px',
                    borderRadius: '50%', // To make it circular
                  }}
                />
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
              onClose={() => setAnchorElUser(null)}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
