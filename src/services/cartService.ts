import cartModel from "../models/cartModel";
import { productModules } from "../models/productModules";

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
  return cart;
};
export interface AddItemToCart {
  productId: any;
  userId: string;
  quantity: number;
}
export const addItemToCart = async ({
  productId,
  userId,
  quantity,
}: AddItemToCart) => {
  const cart = await getActivCartForUser({ userId });

  //Does the item exist in the cart
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  if (existsInCart) {
    return { data: "Item already exist in cart!", statusCode: 400 };
  }
  //fetch the product
  // const product = await productModules.findById(productId);
  // if (!productId) {
  //   return { data: "Product not found!", statusCode: 400 };
  // }
  // if (product!.stock < quantity) {
  //   return { data: "low stock for quantity", statusCode: 400 };
  // }
  const product = await productModules.findById(productId);

if (!product) {
  return { data: "Product not found!", statusCode: 404 };
}

// التحقق من الكمية
if (product.stock < quantity) {
  return { data: "Insufficient stock", statusCode: 400 };
}

  // found
  cart.items.push({
    product: productId,
    unitPrice: product!.price,
    quantitiy: quantity,
  });
  //update totalAmount

  cart.totalAmount += product.price * quantity;

  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 201 };
};
