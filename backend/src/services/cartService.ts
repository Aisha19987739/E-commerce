import cartModel, { Icart, IcartItem } from "../models/cartModel";
import { IorderItem, OrderModel } from "../models/OrderModel";
import { productModules } from "../models/productModel";

interface createCartForUser {
  userId: string;
}
const CreateCartForUser = async ({ userId }: createCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};
export interface GetActivCartForUser {
  userId: string;
  populateProduct?: boolean;
}

export const getActivCartForUser = async ({
  userId,
  populateProduct = false,
}: GetActivCartForUser) => {
  let cart;
  if (populateProduct) {
    cart = await cartModel
      .findOne({ userId, status: "Active" })
      .populate("items.product");
  } else {
    cart = await cartModel.findOne({ userId, status: "Active" });
  }

  if (!cart) {
    cart = await CreateCartForUser({ userId });
  }
  return cart;
};
interface ClearCart {
  userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
  const cart = await getActivCartForUser({ userId });
  cart.items = [];
  cart.totalAmount = 0;
  const updatedCart = await cart.save();

  return {
    data: await getActivCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
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
  const cart = await getActivCartForUser({ userId, populateProduct: true });

  //Does the item exist in the cart
  const existsInCart = cart.items.find(
    (p) => (p.product._id?.toString?.() || p.product.toString?.()) === productId
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
    quantity: quantity,
  });
  //update totalAmount

  cart.totalAmount += product.price * quantity;

  await cart.save();
  return {
    data: await getActivCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};
interface UpdateItemIncart {
  productId: any;
  userId: string;
  quantity: number;
}
export const updateItemInCart = async ({
  userId,
  productId,
  quantity,
}: UpdateItemIncart) => {
  if (!userId || !productId || typeof quantity !== "number") {
    return { statusCode: 400, data: { error: "Missing fields" } };
  }

  const cart = await getActivCartForUser({ userId, populateProduct: true });

  const getProductId = (product: any) =>
    product._id ? product._id.toString() : product.toString();

  const itemIndex = cart.items.findIndex(
    (p) => getProductId(p.product) === productId
  );

  if (itemIndex === -1) {
    return { statusCode: 400, data: { error: "Item does not exist in cart!" } };
  }

  if (quantity <= 0) {
    // إذا الكمية صفر أو أقل، نحذفه
    cart.items.splice(itemIndex, 1);
  } else {
    // تحديث الكمية
    cart.items[itemIndex].quantity = quantity;
  }

  cart.totalAmount = calculateTotalAmount({ cartItems: cart.items });
  await cart.save();

  const updatedCart = await getActivCartForUser({
    userId,
    populateProduct: true,
  });

  return { statusCode: 200, data: updatedCart };
};

interface DeleteItemInCart {
  productId: any;
  userId: string;
}

export const deletItemIncart = async ({
  userId,
  productId,
}: DeleteItemInCart) => {
  const cart = await getActivCartForUser({ userId, populateProduct: true });
  const existsInCart = cart.items.find(
    (p) => p.product?._id?.toString() === productId
  );

  if (!existsInCart) {
    return { data: "Item does not exist in cart!", statusCode: 400 };
  }
  const otherCartItems = cart.items.filter(
    (p) => p.product?._id?.toString() !== productId
  );

  const total = calculateTotalAmount({ cartItems: otherCartItems });
  cart.items = otherCartItems;
  cart.totalAmount = total;
  await cart.save();
  return {
    data: await getActivCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};
const calculateTotalAmount = ({ cartItems }: { cartItems: IcartItem[] }) => {
  const total = cartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);
  return total;
};
interface Checkout {
  userId: string;
  address: string;
}

export const checkout = async ({ userId, address }: Checkout) => {
  if (!address) {
    return { data: "Please Enter address", statusCode: 400 };
  }
  const cart = await getActivCartForUser({ userId, populateProduct: true });
  const orderItems: IorderItem[] = [];
  //loop CartItems and create orderItem
  for (const item of cart.items) {
    const product = await productModules.findById(item.product);
    if (!product) {
      return { data: "product not found", statusCode: 400 };
    }

    const orderItem: IorderItem = {
      productTitle: product!.title,
      productImage: product!.image,
      quantity: item.quantity,
      unitprice: item.unitPrice,
    };
    orderItems.push(orderItem);
  }
  const order = await OrderModel.create({
    orderItem: orderItems,
    total: cart.totalAmount,
    address,
    userId,
  });
  await order.save();
  cart.status = "Completed";
  await cart.save();
  return { data: order, statusCode: 200 };
};
