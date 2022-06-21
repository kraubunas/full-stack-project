import {
  Button, Container, FormControl, FormControlLabel, FormLabel, InputAdornment, Paper, Popover, Radio, RadioGroup, TextField, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import UpdateIcon from '@mui/icons-material/Update';
import { useNavigate } from 'react-router-dom';
import { FormikConfig, useFormik } from 'formik';
import * as Yup from 'yup';
import { ProductPopulated } from '../../types/products';
import { productUpdateProductAction } from '../../store/features/products/products-action-creators';
import { useRootSelector } from '../../store';
import { useRootDispatch } from '../../store/hooks';
import { selectProductById } from '../../store/features/products/products-selectors';

type CreateUpdateProductFormik = FormikConfig<ProductPopulated>;

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Required field'),
  image: Yup.string()
    .required('Required field'),
  price: Yup.string()
    .required('Required field'),
});

type ProductCardUpdateProps = {
  id: string,
};

const ProductCardUpdate: React.FC<ProductCardUpdateProps> = ({ id }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popover = open ? 'simple-popover' : undefined;

  const dispatch = useRootDispatch();
  const product = useRootSelector(selectProductById(id));
  const navigate = useNavigate();
  const [categories, setCategories] = useState('');
  const initialValues = product || {
    id: '',
    name: '',
    image: [''],
    price: '',
    categoryIds: '',
    updatedAt: '',
  };

  const handleFormSubmit: CreateUpdateProductFormik['onSubmit'] = (values) => {
    dispatch(productUpdateProductAction(values));
    navigate('/products');
  };

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik<ProductPopulated>({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema,
  });

  return (
    <div>
      <Button aria-describedby={popover} variant="contained" color="warning" sx={{ display: 'flex', gap: 3 }} onClick={handleClick}>
        <UpdateIcon />
        Update
      </Button>
      <Popover
        id={popover}
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
              <TextField
                name="name"
                type="text"
                label="Product name"
                value={values.name}
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
              />
              <TextField
                name="image"
                type="url"
                label="Image URL"
                value={values.image}
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.image && Boolean(errors.image)}
              />
              <TextField
                name="price"
                type="text"
                label="Price in €"
                value={values.price}
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price && Boolean(errors.price)}
                InputProps={{ endAdornment: <InputAdornment position="end">€</InputAdornment> }}
              />
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
