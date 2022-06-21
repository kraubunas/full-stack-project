import React from 'react';
import {
  Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { NumberPicker } from 'react-widgets/cjs';
import { useRootSelector } from '../../store';
import { selectCartItems } from '../../store/selectors';
import { useRootDispatch } from '../../store/hooks';
import Img from '../img';
import { cartDeleteItemAction } from '../../store/features/cart/cart-action-creators';

const Cart: React.FC = () => {
  const cart = useRootSelector(selectCartItems);
  const dispatch = useRootDispatch();

  const handleDelete = (cartItemId: string) => {
    const deleteCartItemAction = cartDeleteItemAction(cartItemId);
    dispatch(deleteCartItemAction);
  };

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
              <Button id={cartItem.id} variant="text" onClick={() => handleDelete(cartItem.id)}>
                <CloseRoundedIcon />
              </Button>
              <TableCell component="th" scope="row">{cartItem.item.name}</TableCell>
              <TableCell align="right">
                {cartItem.item.price}
                €
              </TableCell>
              <TableCell align="right" sx={{ width: '100px' }}>
                <NumberPicker min={0} max={10} defaultValue={cartItem.amount} />
              </TableCell>
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
