const app = require("express").Router();
const categoryController = require("../controllers/categoryController");
const { verifyAdmin } = require("../middleware/verifyToken");

/*
    method => get 
    route  => api/category/:id
    accses => all 
    desc   => to get all category
*/
app.get("/", categoryController.getAllCategory);
/*
    method => get 
    route  => api/category/
    accses => all 
    desc   => to category by id
*/
app.get("/:id", categoryController.getCategoryById);
/*
    method => post 
    route  => api/category/
    accses => all 
    desc   => to create category
*/
app.post("/", verifyAdmin, categoryController.addCategory);

/*
    method => patch 
    route  => api/category/id
    accses => only user have the account  
    desc   => to updet category
*/
app.patch("/:id", verifyAdmin, categoryController.updateCategory);

/*
    method => delete 
    route  => api/category/id
    accses => only user have the account  
    desc   => to delete category
*/
app.delete("/:id", verifyAdmin, categoryController.deleteCategoryById);

module.exports = app;
