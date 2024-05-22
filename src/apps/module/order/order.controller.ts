import { Request, Response } from "express";
import { orderService } from "./order.service";


const postOrder = async(req:Request , res:Response) =>{
    try{
       const data = req.body;
       
       const result = await orderService.createOrderIntoDb(data)
       res.status(200).json({
        success:true,
        message:"Order created successfully!",
        data:result
       })
    }
    catch(error:any){
        res.status(500).json({
            success:true,
            message:"Something is Wrong in Order!!!",
            data:error.message
           })
    }
}


const getOrder = async (req:Request , res:Response) =>{
    try{
        const {email} = req.query;

        if(email && typeof email === "string"){
            const result = await orderService.getOrderEmailIntoDb(email);

            res.status(200).json({
                success: true,
                message: "Orders fetched successfully for user email!",
                data:result
            })
        }



        const result = await orderService.getOrderIntoDb()
      
        res.status(200).json({
            success:true,
            message: "Orders fetched successfully!",
            data:result
        })
        
    }
    catch(error: any){
    res.status(500).json({
        success:false,
        message: "Orders fetching unsuccessfull",
        data: error.message
    })
    }
}

export const orderController = {
    postOrder,
    getOrder,
}