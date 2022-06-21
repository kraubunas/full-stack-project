import React, { useState, useRef } from 'react';
import {
  Avatar,
  Popper,
  Box,
  Paper,
  MenuList,
  MenuItem,
  Divider,
  Typography,
  Badge,
  Drawer,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import deepPurple from '@mui/material/colors/deepPurple';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { selectAuthUser, selectCartItemsCount } from '../../store/selectors';
import { authLogoutAction } from '../../store/features/auth/auth-action-creators';
import Cart from '../cart/cart';
import { CartStyle } from './navbar-link';

const NavbarAuthMenu: React.FC = () => {
  const navigate = useNavigate();
  const user = useRootSelector(selectAuthUser);
  const dispatch = useRootDispatch();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const popperAnchorRef = useRef<HTMLDivElement>(null);

  const cartItemsCount = useRootSelector(selectCartItemsCount);

  const logout = () => {
    dispatch(authLogoutAction);
  };
  const handleNavigate = (route: string) => {
    setMenuOpen(false);
    navigate(route);
  };

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const [cartOpen, setCartOpen] = useState(false);

  return (
    <Box
      ref={popperAnchorRef}
      sx={{ display: 'inline-flex', alignItems: 'center', height: 64 }}
    >
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart />
      </Drawer>
      <CartStyle>
        <IconButton aria-label="cart" sx={{ zIndex: 100 }} onClick={() => setCartOpen(true)}>
          <Badge badgeContent={cartItemsCount} color="primary">
            <ShoppingCartIcon htmlColor="white" />
          </Badge>
        </IconButton>
      </CartStyle>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={handleMenuOpen}
      >
        <Typography sx={{ mr: 2, userSelect: 'none' }}>{user?.email}</Typography>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>{user?.email.toString().toUpperCase().charAt(0)}</Avatar>
      </Box>
      <Popper
        placement="bottom-end"
        anchorEl={popperAnchorRef.current}
        open={menuOpen}
        sx={{ zIndex: 'tooltip' }}
      >
        <Paper elevation={3}>
          <MenuList>
            <MenuItem onClick={() => handleNavigate('/add-new-product')}>
              Add new product
            </MenuItem>
            <MenuItem onClick={() => handleNavigate('/update-products')}>
              Update products
            </MenuItem>
            <Divider />
            <MenuItem onClick={logout}>
              Logout
            </MenuItem>
          </MenuList>
        </Paper>
      </Popper>
    </Box>
  );
};

export default NavbarAuthMenu;
