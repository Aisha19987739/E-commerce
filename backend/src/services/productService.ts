import { productModules } from "../models/productModel";

export const getallProduct = async () => {
  return await productModules.find();
};
export const seedinitialProducts = async () => {
  try {
    const products = [
      {
        title: "Dell Laptop",
        price: 1500,
        image:
          "https://www.shutterstock.com/image-photo/indonesia-mar-11-24-dell-600nw-2466605253.jpg",
        stock: 10,
      },
      {
        title: "Asus Laptop",
        price: 3500,
        image:
          "https://dlcdnwebimgs.asus.com/gain/012360e8-8df2-4b3c-9523-833e8f00df9b/",
        stock: 20,
      },
      {
        title: "HP Laptop",
        price: 700,
        image:
          "https://www.shutterstock.com/image-photo/bangkok-thailand-hp-launch-new-260nw-2126914553.jpg",
        stock: 15,
      },
    ];
    const exsitingProducts = await getallProduct();
    if (exsitingProducts.length === 0) {
      await productModules.insertMany(products);
    }
  } catch (err) {
    console.error("Cannot see  database mongoose", err);
  }
};
