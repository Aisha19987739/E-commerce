import { productModules } from "../models/productModel";

export const getallProduct = async () => {
  return await productModules.find();
};
export const seedinitialProducts = async () => {
  try{
    const products = [
      { title: "Dell Laptop", price:100, image: "./image/img1",stock:10 },
    
    ];
    const exsitingProducts = await getallProduct();
    if (exsitingProducts.length === 0) {
      await productModules.insertMany(products);
    }
  }
  catch(err){
    console.error("Cannot see  database mongoose",err)
  }
 
};
