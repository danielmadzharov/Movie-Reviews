import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/authContext';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header() {
  const { isAuthenticated } = useAuthContext();

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: '30px' }}>
      <AppBar position="absolute">
        <Toolbar>
          <Box
            sx={{
              display: 'block',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
                m: 1,
              },
            }}
          >
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button component={Link} to="/" style={{ color: 'white' }}>
                Home
              </Button>
            </ButtonGroup>
          </Box>

          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexGrow: 1 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'enter movie name' }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Search>
          </form>

          <ButtonGroup variant="outlined" aria-label="Basic button group">
            {isAuthenticated ? (
              <>
              <Button component={Link} to="/create" style={{ color: 'white' }}>
                Create Movie
              </Button>
              <Button component={Link} to="/logout" style={{ color: 'white' }}>
                Logout
              </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" style={{ color: 'white' }}>
                  Login
                </Button>
                <Button component={Link} to="/register" style={{ color: 'white' }}>
                  Register
                </Button>
              </>
            )}
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
