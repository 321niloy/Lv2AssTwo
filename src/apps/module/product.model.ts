import { Schema, model} from 'mongoose';
import { TInventory, TVariants, Tproduct } from './product/product.interface';

const VariantsSchema = new Schema<TVariants>({
    type:{type:String, required: true},
    value:{type:String, required: true}
})

const InventorySchema = new Schema<TInventory>({
    quantity:{type: Number, required:true},
    inStock:{type:Boolean , required: true}

})

const ProductSchema = new Schema<Tproduct>({
    name: {type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number , required: true},
    category:{type: String , required: true},
    tags:{type:[String] , required:true},
    variants: {type: [VariantsSchema] , required: true},
    inventory:{type:InventorySchema, required:true},
    isDeleted: {type: Boolean,default: false},
  });



  /// middleware
  ProductSchema.pre('find', function(next){
  this.find({isDeleted:{$ne: true}});
  next()
  })


  ProductSchema.pre('findOne' , function(next){
    this.findOne({isDeleted:{$ne: true}});
    next()
  })


  const product = model<Tproduct>('phoneProduct', ProductSchema);

  export default product;
