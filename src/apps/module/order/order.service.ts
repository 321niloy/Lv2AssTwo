
import { Torder } from "./order.interface";
import order from "../order.model";
import product from "../product.model";



const createOrderIntoDb = async (data:Torder) =>{
    try{
        const oneProduct = await product.findOne({_id: data.productId });

        if (!oneProduct) {
            throw new Error("Order not found");
        }
        else if(oneProduct.inventory.quantity < data.quantity){
            throw new Error("Insufficient quantity available in inventory")
            
        }
        else if (oneProduct.inventory.quantity <= 0) {
            throw new Error("Insufficient quantity available in inventory");
        }
    
        const result = await order.create(data);
    
        // Decrease the quantity in the product's inventory
        oneProduct.inventory.quantity -= result.quantity;
     
        if(oneProduct.inventory.quantity === 0){
            oneProduct.inventory.inStock = false;
        }
       
    
        await oneProduct.save();
        return result;
    
    }
    catch(error: any){
    throw{
        success:false,
        message: error.message
    }
    }
}


const getOrderIntoDb = async () =>{
    const result = await order.find();
    return result;
}


const getOrderEmailIntoDb = async (email: string) =>{
    const result = await order.find({email})
    return result;
}

export const orderService ={
    createOrderIntoDb,
    getOrderIntoDb,
    getOrderEmailIntoDb
}