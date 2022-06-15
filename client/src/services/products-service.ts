import Product from '../types/products';
import ApiService, { formatError } from './api-services';

const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await ApiService.get<{ products: Product[] }>('/api/products?populate=categories');
    return data.products;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

const ShopService = {
  fetchProducts,
};

export default ShopService;
