import {
  Button, Container, FormControl, FormControlLabel, FormLabel, InputAdornment, Paper, Popover, Radio, RadioGroup, TextField, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import UpdateIcon from '@mui/icons-material/Update';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import { useNavigate } from 'react-router-dom';
import { useRootSelector } from '../../store';
import { selectAuthUser } from '../../store/selectors';

const ProductCardUpdate = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [image, setImage] = useState(['']);
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product = {
      name, image, price, categories,
    };
    fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    }).then(() => {
      console.log('new product added');
      navigate('/products');
    });
  };

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="warning" sx={{ display: 'flex', gap: 3 }} onClick={handleClick}>
        <UpdateIcon />
        Update
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Paper sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: { xs: '100%', sm: '100%', md: '500px' }, mt: 3, py: 3,
        }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
            Update product
            {' '}
            <UpdateIcon />
          </Typography>
          <Container sx={{
            mt: 1,
          }}
          >
            <form
              style={{
                display: 'flex', flexDirection: 'column', gap: 15,
              }}
              onSubmit={handleSubmit}
            >
              <TextField type="text" required value={name} onChange={(e) => setName(e.target.value)} label="Product name" />
              <TextField type="url" required value={image} onChange={(e) => setImage([e.target.value])} label="Image URL" />
              <TextField type="text" required value={price} onChange={(e) => setPrice(e.target.value)} label="Price in €" InputProps={{ endAdornment: <InputAdornment position="end">€</InputAdornment> }} />
              <FormControl required>
                <FormLabel>Category</FormLabel>
                <RadioGroup row value={categories} onChange={(e) => setCategories(e.target.value)}>
                  <FormControlLabel value="candlestick" control={<Radio />} label="Candlestick" />
                  <FormControlLabel value="candle" control={<Radio />} label="Candle" />
                </RadioGroup>
              </FormControl>
              <Button type="submit" variant="contained">Update</Button>
            </form>
          </Container>
        </Paper>
      </Popover>
    </div>
  );
};

export default ProductCardUpdate;
