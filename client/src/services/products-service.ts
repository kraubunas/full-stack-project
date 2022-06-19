import { Token } from '@mui/icons-material';
import { ProductPopulated, CreateProduct } from '../types/products';
import ApiService, { formatError } from './api-services';

const fetchProducts = async (): Promise<ProductPopulated[]> => {
  try {
    const { data } = await ApiService.get<{ items: ProductPopulated[] }>('api/items?populate=categories');
    return data.items;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

const createNewProduct = async (item: CreateProduct, token: string) => {
  const { data } = await ApiService.post<{ item: CreateProduct }>(
    'api/items',
    item,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return data.item;
};

const ProductService = {
  fetchProducts,
  createNewProduct,
};

export default ProductService;
