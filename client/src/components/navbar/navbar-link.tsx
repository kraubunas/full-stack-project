import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import customTheme from '../../styles/theme';

const NavbarLink = styled(NavLink)(({ theme }) => ({
  display: 'flex',
  width: '100px',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 20,
  textDecoration: 'none',
  boxShadow: `inset 0 0 0 0 ${theme.palette.darkBlue.main}`,
  color: customTheme.palette.lightBlue.main,
  padding: '10px 20px',
  transition: 'color .3s ease-in-out, box-shadow .3s ease-in-out',
  borderRadius: 3,

  ':hover': {
    boxShadow: `inset 100px 0 0 0 ${theme.palette.blue.main}`,
    color: theme.palette.white.main,
  },

  '&.active': {
    boxShadow: `inset 100px 0 0 0 ${theme.palette.lightBlue.main}`,
    color: theme.palette.darkBlue.main,
  },
}));

export const CartStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '50px',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 20,
  textDecoration: 'none',
  boxShadow: `inset 0 0 0 0 ${theme.palette.darkBlue.main}`,
  color: customTheme.palette.lightBlue.main,
  padding: '10px 20px',
  transition: 'color .3s ease-in-out, box-shadow .3s ease-in-out',
  borderRadius: 3,

  ':hover': {
    boxShadow: `inset 100px 0 0 0 ${theme.palette.blue.main}`,
    color: theme.palette.darkBlue.main,
  },

  '&.active': {
    boxShadow: `inset 100px 0 0 0 ${theme.palette.lightBlue.main}`,
    color: theme.palette.darkBlue.main,
  },
}));

export default NavbarLink;
