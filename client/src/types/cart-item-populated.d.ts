export type CartItemPopulated = {
  id: string,
  item: {
    id: string,
    name: string,
    price: number,
    updatedAt: string,
    categoryIds: string[],
    image: string[],
  },
  amount: number,
  updatedAt: string,
};
