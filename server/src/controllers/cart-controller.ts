import { RequestHandler } from 'express';
// import ProductModel from '../models/product-model';
// import UserModel from '../models/user-model';

export const getCart: RequestHandler = async (req, res) => {
    const { authUser } = req;

    res.status(200).send({
        cartItems: authUser.cartItems,
    });
};

export const addItem: RequestHandler = async (req, res) => {
  const newCartItemData = req.body;
  const { authUser } = req;

  try {
    const productExistsInCart = authUser.cartItems.some(
      (cartItem) => cartItem.itemId.equals(newCartItemData.itemId),
    );
    if (productExistsInCart) {
      throw new Error('Toks daiktas jau yra krepšelyje');
    }
    authUser.cartItems.push(newCartItemData);
    await authUser.save();

    res.status(200).json({
      cartItem: authUser.cartItems[authUser.cartItems.length - 1],
    });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Neteisingi pridedamo produkto duomenys',
    });
  }
};

export const updateItem: RequestHandler = async (req, res) => {
    const { itemId } = req.params;
    const { authUser } = req;
    const { amount } = req.body;

    try {
        const cartItemRef = authUser.cartItems.find((item) => item._id.equals(itemId));

        if (cartItemRef === undefined) {
            throw new Error(`Nerastas krepselio daiktas su tokiu id: '${itemId}'`);
        }

        cartItemRef.amount = amount;

        await authUser.save();

        res.status(200).send({
            cartItem: cartItemRef,
        });
    } catch (error) {
        res.status(400).json({
        error: error instanceof Error ? error.message : 'Neteisingi atnaujinamo produkto duomenys',
    });
    }
};

export const deleteItem: RequestHandler = async (req, res) => {
    const { itemId } = req.params;
    const user = req.authUser;
    try {
        const deletedCartItem = user.cartItems.find((cartItem) => cartItem._id.equals(itemId));
        if (deletedCartItem === undefined) {
            res.status(400).json({
                error: 'Nerastas pirkiniu krepselio daiktas',
            });
            return;
        }

        user.cartItems = user.cartItems.filter((cartItem) => cartItem !== deletedCartItem);
        await user.save();
        res.status(200).send({ cartItem: deletedCartItem });
    } catch (error) {
        res.status(400).json({
            error: 'Neteisingi trinamo produkto duomenys',
        });
    }
};
