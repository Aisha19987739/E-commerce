import { productModules } from "../models/productModules";

export const getallProduct = async () => {
  return await productModules.find();
};
export const seedinitialProducts = async () => {
  const products = [
    { title: "Dell Laptop", price:100, image: "./image/img1",stock:10 },
  
  ];
  const exsitingProducts = await getallProduct();
  if (exsitingProducts.length === 0) {
    await productModules.insertMany(products);
  }
};
