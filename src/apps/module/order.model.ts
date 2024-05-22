import { Schema, model} from 'mongoose';
import { Torder } from "./order/order.interface";

const OrderSchema = new Schema<Torder>({
    email:{type:String, required:[true, "Must be give Email"]},
    productId:{type:String, required:[true, "Give a Product Id"]},
    price:{type:Number, required:[true, "Must give a number"]},
    quantity:{type:Number, required:[true, "Should be give Number"]}
})


const order = model<Torder>('order', OrderSchema);

export default order;