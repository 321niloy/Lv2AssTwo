import {z} from "zod";

const variantsValidationSchema = z.object({
    type:z.string().min(1, "Type is Required"),
    value:z.string().min(1, "value is required")
});

const InventoryValidationSchema = z.object({
    quantity: z.number().min(0 , "Quantity must be at least zero"),
    inStock:z.boolean(),
});


const searchQuerySchema = z.object({
    searchTerm: z.string().min(1, "Not emty things")
})




const ProductValidationSchema = z.object({
name:z.string().min(1, "Name should be Give"),
description:z.string().min(1, "Description needed"),
price:z.number().positive("Price should to be positive number"),
category:z.string().min(1, "One Category must be needed"),
tags:z.array(z.string().min(1, "tags must be fullfiled/ must be one")),
variants:z.array(variantsValidationSchema).min(1, "Atleast on variants is required"),
inventory:InventoryValidationSchema,
isDeleted:z.boolean().optional().default(false)
})

export {ProductValidationSchema , searchQuerySchema}