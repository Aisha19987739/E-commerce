import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { Iproduct } from "./productModules";
const CartStatusEnum = ["Active", "Completed"];
export interface IcartItem  {
  product: Iproduct;
  unitPrice: number;
  quantity
: number;
}
export interface Icart extends Document {
  userId: ObjectId | string;
  items: IcartItem[];
  totalAmount: number;
  status: "Active" | "completed";
}
const IcartItemSchema = new Schema<IcartItem>({
  product: { type: Schema.Types.ObjectId, ref: "product", required: true },
  unitPrice: { type: Number, required: true },
  quantity
: { type: Number, required: true },
});
const cartSchema = new Schema<Icart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [IcartItemSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: CartStatusEnum, default: "Active" },
});
 const cartModel = mongoose.model<Icart>("Cart", cartSchema);
 export default cartModel
