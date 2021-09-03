const app = require("express").Router();

const authController = require("../controllers/authController");

/*
    method => post 
    route  => api/auth/signup
    accses => all 
    desc   => to create a user
*/
app.post("/signup", authController.signUp);
/*
    method => post 
    route  => api/auth/signup
    accses => all 
    desc   => to login user
*/
app.post("/login", authController.logIn);
/*
    method => post 
    route  => api/auth/logout
    accses => all 
    desc   => to logOut user
*/
app.get("/logout", authController.logOut);
/*
    method => post 
    route  => api/auth/admin/signup
    accses => all 
    desc   => to create admin
*/
app.post("/admin/signup", authController.signUpAdmin);
/*
    method => post 
    route  => api/auth/admin/login
    accses => all 
    desc   => to login admin
*/
app.post("/admin/login", authController.logInAdmin);
/*
    method => post 
    route  => api/auth/admin/logout
    accses => all 
    desc   => to log out admin
*/
app.get("/admin/logout", authController.logOutAdmin);

module.exports = app;
