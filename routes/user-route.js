const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/user-controller");
const mwVerifAuth = require("../middlewares/verifyAuth");

userRoute
  .route("/user")
  // .get([mwVerifAuth.verifyToken, mwVerifAuth.verifyAdmin], userController.getUser)
  .get(userController.getUser)
  .post(
    [mwVerifAuth.verifyToken, mwVerifAuth.verifyAdmin],
    userController.tambah
  );

userRoute
  .route("/user/:id")
  .get(
    // [mwVerifAuth.verifyToken, mwVerifAuth.verifyAdmin],
    userController.getOneUser
  )
  .put([mwVerifAuth.verifyToken, mwVerifAuth.verifyAdmin], userController.edit)
  .delete(
    [mwVerifAuth.verifyToken, mwVerifAuth.verifyAdmin],
    userController.hapus
  );

module.exports = userRoute;
