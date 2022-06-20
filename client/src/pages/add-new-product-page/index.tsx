import React, { useState } from 'react';
import * as Yup from 'yup';
import {
  Typography, Container, Paper, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, InputAdornment,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useNavigate } from 'react-router-dom';
import { FormikConfig, useFormik } from 'formik';
import { useRootSelector, useRootDispatch } from '../../store/hooks';
import { selectAuthUser } from '../../store/selectors';
import { productCreateNewProductAction } from '../../store/features/products/products-action-creators';
import { CreateProduct } from '../../types/products';

type CreateNewProductFormik = FormikConfig<CreateProduct>;

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Required field'),
  image: Yup.string()
    .required('Required field'),
  price: Yup.string()
    .required('Required field'),
});

const CreateNewProductPage: React.FC = () => {
  const user = useRootSelector(selectAuthUser);
  const dispatch = useRootDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState('');

  const initialValues = {
    name: '',
    image: [''],
    price: '',
    categoryIds: '',
    updatedAt: '',
  };

  const handleFormSubmit: CreateNewProductFormik['onSubmit'] = (item) => {
    const createProductAction = productCreateNewProductAction({ ...item, categoryIds: category });
    dispatch(createProductAction);
    navigate('/products');
  };

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik<CreateProduct>({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema,
  });

  return (
    <Container sx={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <Typography
        component="h1"
        variant="h3"
        sx={{
          textAlign: 'center', mt: 15,
        }}
      >
        {`Hello, ${user?.email}`}
      </Typography>
      <Paper sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: { xs: '100%', sm: '100%', md: '500px' }, mt: 3, py: 3,
      }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
          Create new product
          {' '}
          <AddBoxOutlinedIcon />
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
              <RadioGroup
                row
                value={values.categoryIds}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="candlestick"
                  control={<Radio name="categoryIds" value="candlestick" />}
                  label="Candlestick"
                />
                <FormControlLabel
                  value="candle"
                  control={<Radio name="categoryIds" value="candle" />}
                  label="Candle"
                />
              </RadioGroup>
            </FormControl>
            <Button type="submit" variant="contained">Add product</Button>
          </form>
        </Container>
      </Paper>
    </Container>
  );
};

export default CreateNewProductPage;
