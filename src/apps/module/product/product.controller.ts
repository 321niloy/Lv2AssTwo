import { Request, Response } from 'express';
import { Productservice } from './product.service';
import {
  ProductValidationSchema,
  searchQuerySchema,
} from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const prouctfromValidation = ProductValidationSchema.parse(product);
    const result =
      await Productservice.createProductintoDb(prouctfromValidation);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messeage: error || 'Oops!! Product unSuccessfully Created',
      data: error,
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    if (searchTerm && typeof searchTerm === 'string') {
      const persedQuery = searchQuerySchema.parse({ searchTerm });
      const result = await Productservice.searchFromProductDb(
        persedQuery.searchTerm,
      );

      res.status(200).json({
        success: true,
        message: `search term Products matching  '${searchTerm}' fetched successfully!`,
        data: result,
      });
    }

    const result = await Productservice.getProductDb();

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messege: error || 'Oops!! Product unSuccessfully Created',
      data: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await Productservice.getSingleProductDb(productId);

    if (result === null) {
      res.status(500).json({
        success: false,
        message: 'Product not Found',
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Product fetched mmmm successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Opps Single Product can not successfully fetched',
      data: error,
    });
  }
};

const updateSingelProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedata = req.body;
    const result = await Productservice.updateSingelProductDb(
      productId,
      updatedata,
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Updated Error',
      data: error,
    });
  }
};

const DeleteSingelProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await Productservice.deleteSingelProductDb(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null || result,
    });
  } catch (error) {
    res.status(500).json({
      seccess: false,
      message: 'Oops!! Data not Deleted',
      data: error,
    });
  }
};

export const ProductController = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateSingelProduct,
  DeleteSingelProduct,
};
