import mongoose, { ObjectId, Schema } from "mongoose";
 export interface IorderItem{
    productTitle:string;
    productImage:string;
    unitprice:number;
    quantity:number;
 }
 export interface IOder extends Document{
    orderItem:IorderItem[];
    total:number;
    address:string;
    userId:ObjectId | string;
 }
 const IorderItemSchema = new Schema<IorderItem>({
    productTitle:{type:String,required:true},
    productImage:{type:String,required:true},
    unitprice:{type:Number,required:true},
    quantity:{type:Number,required:true},


 });

 const IOderSchema = new Schema<IOder>({
    orderItem:[IorderItemSchema],
    total:{type:Number,required:true},
    address:{type:String,required:true},
    userId:{type:Schema.Types.ObjectId,ref:"User",required:true}

 })
 export const OrderModel = mongoose.model<IOder>("Order",IOderSchema)