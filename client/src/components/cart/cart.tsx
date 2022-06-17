import React from 'react';
import {
  IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useRootSelector } from '../../store';
import { selectCartItems } from '../../store/selectors';
import { useRootDispatch } from '../../store/hooks';
import { CartItem } from '../../types/cart-item';
import Img from '../img';

const Cart: React.FC<CartItem> = ({
  id,
}) => {
  const cart = useRootSelector(selectCartItems);

  const dispatch = useRootDispatch();

  // const removeFromCartAction = (): void => {
  //   const addRemoveFromCartItemAction = removeFromCart(id);
  //   dispatch(addRemoveFromCartItemAction);
  // };

  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((cartItem) => (
            <TableRow
              key={cartItem.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <IconButton>
                <CloseRoundedIcon />
              </IconButton>
              <TableCell component="th" scope="row">{cartItem.item.name}</TableCell>
              <TableCell align="right">{cartItem.item.price}</TableCell>
              <TableCell align="right">{cartItem.amount}</TableCell>
              <TableCell align="right">
                <Img src={cartItem.item.image[0]} sx={{ height: 40, width: 40 }} alt={cartItem.item.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Cart;
