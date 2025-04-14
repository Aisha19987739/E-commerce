import { cartModel } from "../models/cartModel";

interface createCartForUser {
  userId: string;
}
const CreateCartForUser = async ({ userId }: createCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};
export const getActivCartForUser = async ({ userId }: createCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "Active" });
  if (!cart) {
    cart = await CreateCartForUser({ userId });
  }
};
