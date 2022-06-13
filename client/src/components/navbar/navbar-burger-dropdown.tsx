import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import NavbarLink, { CartStyle } from './navbar-link';
import theme from '../../styles/theme';

const NavBarBurgerDropDownMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <CartStyle>
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
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>
            <NavbarLink to="/">Home</NavbarLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavbarLink to="/products">Products</NavbarLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavbarLink to="/about">About</NavbarLink>
          </MenuItem>
        </Menu>
      </Box>
    </CartStyle>
  );
};

export default NavBarBurgerDropDownMenu;
