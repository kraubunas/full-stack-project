import React, { useState, useRef, useContext } from 'react';
import {
  Avatar,
  Popper,
  Box,
  Paper,
  MenuList,
  MenuItem,
  Divider,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import deepPurple from '@mui/material/colors/deepPurple';
import { useRootDispatch, useRootSelector } from '../../store/hooks';
import { selectUser } from '../../store/selectors';
import { authLogoutAction } from '../../store/features/auth/auth-action-creators';

const NavbarAuthMenu: React.FC = () => {
  const navigate = useNavigate();
  const user = useRootSelector(selectUser);
  const dispatch = useRootDispatch();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const popperAnchorRef = useRef<HTMLDivElement>(null);

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

  return (
    <Box
      ref={popperAnchorRef}
      sx={{ display: 'inline-flex', alignItems: 'center', height: 64 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={handleMenuOpen}
      >
        <Typography sx={{ mr: 2, userSelect: 'none' }}>{user?.email}</Typography>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
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
