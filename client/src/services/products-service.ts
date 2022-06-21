import { ProductPopulated, CreateProduct, UpdateProduct } from '../types/products';
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

const deleteProduct = async (id: string, token: string) => {
  const { data } = await ApiService.delete<{ item: ProductPopulated }>(
    `api/items/${id}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return data.item;
};

const updateProduct = async (item: UpdateProduct, token: string) => {
  const { data } = await ApiService.patch<{ item: UpdateProduct }>(
    `api/items/${item.id}`,
    {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      categoryIds: item.categoryIds,
    },
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
  deleteProduct,
  updateProduct,
};

export default ProductService;
