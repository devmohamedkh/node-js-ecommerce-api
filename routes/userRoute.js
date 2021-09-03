const app = require("express").Router();
const userController = require("../controllers/userController");
const { verifyUser, verifyAdmin } = require("../middleware/verifyToken");

/*
    method => get 
    route  => api/users/:id
    accses => all 
    desc   => to get all users
*/
app.get("/", userController.getAllUsers);
/*
    method => get 
    route  => api/users/
    accses => all 
    desc   => to get all users
*/
app.get("/:id", userController.getUserById);
/*
    method => post 
    route  => api/users/
    accses => all 
    desc   => to create a user
*/
app.post("/", (req, res) => {});

/*
    method => patch 
    route  => api/users/id
    accses => only user have the account  
    desc   => to updet a user 
*/
app.patch("/:id", verifyUser, userController.updateUser);

/*
    method => delete 
    route  => api/users/id
    accses => only user have the account  
    desc   => to delete a user
*/
app.delete("/:id", verifyUser, userController.deleteUserById);

module.exports = app;
