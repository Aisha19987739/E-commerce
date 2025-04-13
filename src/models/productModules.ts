import mongoose, { Schema,Document } from "mongoose";
export  interface Iproduct extends Document{
    title:string;
    image:string;
    price:number;
    stock:number;
}
const productSchema =new Schema<Iproduct>({
    title:{type:String, required:true},
    image:{type:String},
    price:{type:Number, required:true},
    stock:{type:Number, required:true, default:0}

});
export const productModules = mongoose.model<Iproduct>('product',productSchema);