import ProductPopulated from '../types/products';
import ApiService, { formatError } from './api-services';

const fetchProducts = async (): Promise<ProductPopulated[]> => {
  try {
    const { data } = await ApiService.get<{ items: ProductPopulated[] }>('api/items?populate=categories');
    return data.items;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

const ProductService = {
  fetchProducts,
};

export default ProductService;
