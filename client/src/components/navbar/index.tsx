import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import NavbarAuthMenu from './navbar-auth-menu';
import NavbarLink from './navbar-link';
import { useRootSelector } from '../../store/hooks';
import { selectAuthLoggedIn } from '../../store/selectors';
import theme from '../../styles/theme';
import NavBarBurgerDropDownMenu from './navbar-burger-dropdown';

const Navbar: React.FC = () => {
  // useEffect(({ cart }) => {
  //   const count = 0;
  //   cart.array.forEach(element => {

  //   });
  // }, [cart, cartCount]);

  const loggedIn = useRootSelector(selectAuthLoggedIn);

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  return (

    <AppBar position="fixed" sx={{ bgcolor: 'darkBlue.main' }}>
      <Container sx={{ px: { xs: 0, sm: 0 } }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personal Blog
          </Typography>
          {
          isMatch
            ? <NavBarBurgerDropDownMenu />
            : (
              <>
                <NavbarLink to="/">Home</NavbarLink>
                <NavbarLink to="/products">Products</NavbarLink>
                <NavbarLink to="/about">About</NavbarLink>
              </>
            )
         }
          <Box sx={{ display: 'flex' }}>
            {loggedIn ? <NavbarAuthMenu /> : null}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
