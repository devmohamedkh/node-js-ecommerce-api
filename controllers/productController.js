const productServise = require("../utils/service/productServise");
const categoryServise = require("../utils/service/categoryServise");
const {
  errorResponse,
  successResponse,
} = require("../utils/helpers/responsHelper");

exports.addProduct = async (req, res) => {
  try {
    const categoryExist = await categoryServise.getCategoryById(
      req.body.category
    );

    if (!categoryExist)
      return res.status(404).json(errorResponse("category not found", 404));

    const addproduct = await productServise.addProduct(req.body);
    console.log(addproduct);
    if (!addproduct)
      return res
        .status(400)
        .json(errorResponse("Could not update product", 404));
    console.log(addproduct);
    return res
      .status(200)
      .json(successResponse(addproduct, "product updated Successfully!", 201));
  } catch (error) {
    console.log(error);
    return res.status(400).json(errorResponse("Could not add product", 404));
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productExist = await productServise.getProductById(req.params.id);

    if (!productExist)
      return res.status(404).json(errorResponse("product not found", 404));

    if (productExist.userId != req.userId && !req.admin)
      return res
        .status(401)
        .json(
          errorResponse("you dont have promithon to deleted the prodect", 401)
        );

    const updatedProduct = await productServise.updateProductById(
      req.params.id,
      req.body
    );

    if (!updatedProduct)
      return res
        .status(400)
        .json(errorResponse("Could not update product", 404));

    return res
      .status(200)
      .json(
        successResponse(updatedProduct, "product updated Successfully!", 201)
      );
  } catch (error) {
    return res.status(400).json(errorResponse("Could not update product", 404));
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const products = await productServise.getAllProduct();
    return res
      .status(200)
      .json(successResponse(products, "get products Successfully!", 201));
  } catch (error) {
    return res.status(400).json(errorResponse("Could not get products ", 400));
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productExist = await productServise.getProductById(req.params.id);

    if (!productExist)
      return res.status(404).json(errorResponse("product not found", 404));

    return res
      .status(200)
      .json(successResponse(productExist, "get product Successfully!", 201));
  } catch (error) {
    console.log(error);
    return res.status(400).json(errorResponse("Could not get products ", 400));
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const productExist = await productServise.getProductById(req.params.id);

    if (!productExist)
      return res.status(404).json(errorResponse("product not found", 404));

    if (productExist.userId != req.userId && !req.admin)
      return res
        .status(401)
        .json(
          errorResponse("you dont have promithon to deleted the prodect", 401)
        );

    const deletedproduct = await productServise.RemoveProductById(
      req.params.id
    );

    if (deletedproduct.deletedCount == 0)
      return res.status(404).json(errorResponse("product not deleted", 404));

    return res
      .status(200)
      .json(successResponse("", "delete product Successfully!", 201));
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json(errorResponse("Could not delete products ", 400));
  }
};
