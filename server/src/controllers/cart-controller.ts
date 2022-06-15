import { RequestHandler } from 'express';
import { CartItem, CartItemProps } from '../models/user-model';
import createCartItemViewModel, { CartItemViewModel } from '../view-model-creators/create-cart-item-view-model';

type CartItemResponse = { cartItem: CartItemViewModel } | ErrorResponseBody;

export const getCart: RequestHandler<
  unknown,
  { cartItems: CartItemViewModel[] } | ErrorResponseBody
> = async (req, res) => {
  const { authUserDoc } = req;

  try {
    if (authUserDoc === undefined) {
      throw new Error('Reikalingas prisijungimas');
    }

    res.status(200).send({
      cartItems: authUserDoc.cartItems.map(createCartItemViewModel),
    });
  } catch (error) {
    res.status(200).send({
      error: error instanceof Error ? error.message : 'Klaida siunčiant krepšelį',
    });
  }
};

export const addItem: RequestHandler<
  unknown,
  CartItemResponse,
  CartItemProps
> = async (req, res) => {
  const newCartItemData = req.body;
  const { authUserDoc } = req;

  try {
    if (authUserDoc === undefined) {
      throw new Error('Reikalingas prisijungimas');
    }

    const productExistsInCart = authUserDoc.cartItems.some(
      (cartItem) => cartItem.itemId.equals(newCartItemData.itemId),
    );

    if (productExistsInCart) {
      throw new Error('Toks daiktas jau yra krepšelyje');
    }
    authUserDoc.cartItems.push(newCartItemData as CartItem);
    await authUserDoc.save();

    const cartItem = authUserDoc.cartItems[authUserDoc.cartItems.length - 1];

    res.status(200).json({
      cartItem: createCartItemViewModel(cartItem),
    });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Neteisingi pridedamo produkto duomenys',
    });
  }
};

export const updateItem: RequestHandler<
  { itemId: string },
  CartItemResponse,
  Partial<CartItemProps>
> = async (req, res) => {
  const { itemId } = req.params;
  const { authUserDoc } = req;
  const { amount } = req.body;

  try {
    if (authUserDoc === undefined) {
      throw new Error('Reikalingas prisijungimas');
    }

    const cartItemRef = authUserDoc.cartItems.find((cartItem) => cartItem._id.equals(itemId));

    if (cartItemRef === undefined) {
      throw new Error(`Nerastas krepšelio daiktas su tokiu id: '${itemId}'`);
    }

    if (amount) {
      cartItemRef.amount = amount;
      await authUserDoc.save();
    }

    res.status(200).send({
      cartItem: createCartItemViewModel(cartItemRef),
    });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Neteisingi atnaujinamo produkto duomenys',
    });
  }
};

export const deleteItem: RequestHandler<
  { itemId: string },
  CartItemResponse
> = async (req, res) => {
  const { itemId } = req.params;
  const { authUserDoc } = req;
  try {
    if (authUserDoc === undefined) {
      throw new Error('Reikalingas prisijungimas');
    }

    const deletedItem = authUserDoc.cartItems.find((cartItem) => cartItem._id.equals(itemId));
    if (deletedItem === undefined) {
      throw new Error('Nerastas pirkinių krepšelio daiktas');
    }

    authUserDoc.cartItems = authUserDoc.cartItems.filter((cartItem) => cartItem !== deletedItem);
    await authUserDoc.save();

    res.status(200).json({ cartItem: createCartItemViewModel(deletedItem) });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Neteisingi trinamo produkto duomenys',
    });
  }
};
