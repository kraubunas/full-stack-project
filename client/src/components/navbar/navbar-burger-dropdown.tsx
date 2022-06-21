import * as React from 'react';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavbarLink, { CartStyle } from './navbar-link';
import theme from '../../styles/theme';

const NavBarBurgerDropDownMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (route: string) => {
    setMenuOpen(false);
    navigate(route);
  };

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon sx={{ color: theme.palette.white.main }} />
      </Button>
      <Paper elevation={3}>
        <MenuList
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => handleNavigate('/')}>
            Home
          </MenuItem>
          <MenuItem onClick={() => handleNavigate('/products')}>
            Products
          </MenuItem>
          <MenuItem onClick={() => handleNavigate('/about')}>
            About
          </MenuItem>
        </MenuList>
      </Paper>
    </Box>
  );
};

export default NavBarBurgerDropDownMenu;
