import product from '../product.model';
import { Tproduct } from './product.interface';

const createProductintoDb = async (productData: Tproduct) => {
  const result = await product.create(productData);
  return result;
};

const getProductDb = async () => {
  const result = await product.find();
  return result;
};

const getSingleProductDb = async (id: string) => {
  const result = await product.findOne({ _id: id });
  return result;
};

const updateSingelProductDb = async (id: string, udatedata: Tproduct) => {
  const result = await product.findByIdAndUpdate(id, udatedata, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingelProductDb = async (id: string) => {
  const result = await product.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

const searchFromProductDb = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'i');
  const result = await product.find({
    $or: [
      { name: regex },
      { description: regex },
      { category: regex },
      { tags: regex },
      { 'variants.type': regex },
      { 'variants.value': regex },
    ],
    isDeleted: { $ne: true },
  });

  return result;
};

export const Productservice = {
  createProductintoDb,
  getProductDb,
  getSingleProductDb,
  updateSingelProductDb,
  deleteSingelProductDb,
  searchFromProductDb,
};
