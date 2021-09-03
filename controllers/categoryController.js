const categoryServise = require("../utils/service/categoryServise");
const CategoryServise = require("../utils/service/CategoryServise");
const {
  errorResponse,
  successResponse,
} = require("../utils/helpers/responsHelper");

exports.addCategory = async (req, res) => {
  try {
    const categoryExist = await categoryServise.getCategoryByName(
      req.body.name
    );

    if (categoryExist)
      return res.status(404).json(errorResponse("category aredy exist", 404));

    const addCategory = await categoryServise.addCategory(req.body.name);

    if (!addCategory)
      return res.status(400).json(errorResponse("Could not add category", 400));

    return res
      .status(200)
      .json(successResponse(addCategory, "category added Successfully!", 201));
  } catch (error) {
    console.log(error);
    return res.status(400).json(errorResponse("Could not add category", 404));
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const CategoryExist = await CategoryServise.getCategoryById(req.params.id);

    if (!CategoryExist)
      return res.status(404).json(errorResponse("Category not found", 404));

    const updatedCategory = await CategoryServise.updateCategoryById(
      req.params.id,
      req.body
    );

    if (!updatedCategory)
      return res
        .status(400)
        .json(errorResponse("Could not update Category", 404));

    return res
      .status(200)
      .json(
        successResponse(updatedCategory, "Category updated Successfully!", 201)
      );
  } catch (error) {
    return res
      .status(400)
      .json(errorResponse("Could not update Category", 404));
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const categorys = await categoryServise.getAllCategorys();
    return res
      .status(200)
      .json(successResponse(categorys, "get category Successfully!", 201));
  } catch (error) {
    return res.status(400).json(errorResponse("Could not get categorys ", 400));
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const categoryExist = await categoryServise.getCategoryById(req.params.id);

    if (!categoryExist)
      return res.status(404).json(errorResponse("category not found", 404));

    return res
      .status(200)
      .json(successResponse(categoryExist, "get category Successfully!", 201));
  } catch (error) {
    console.log(error);
    return res.status(400).json(errorResponse("Could not get categorys ", 400));
  }
};

exports.deleteCategoryById = async (req, res) => {
  try {
    const categoryExist = await categoryServise.getCategoryById(req.params.id);

    if (!categoryExist)
      return res.status(404).json(errorResponse("category not found", 404));

    const deletedcategory = await categoryServise.RemoveCategoryById(
      req.params.id
    );

    if (!deletedcategory)
      return res.status(404).json(errorResponse("category not deleted", 404));

    return res
      .status(200)
      .json(
        successResponse(categoryExist, "delete category Successfully!", 201)
      );
  } catch (error) {
    return res
      .status(400)
      .json(errorResponse("Could not delete categorys ", 400));
  }
};
