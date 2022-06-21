export type ProductPopulated = {
  id: string,
  name: string,
  categoryIds: string,
  price: string,
  image: string[],
  updatedAt: string,
};

export type CreateProduct = Omit<ProductPopulated, 'id' | 'categoryIds'> & {
  categoryIds: string
};

export type UpdateProduct = Omit<ProductPopulated, 'categoryIds'> & {
  categoryIds?: string
};
