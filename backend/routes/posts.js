const express = require("express");
const mongoose = require('mongoose');
const postController = require("../controller/post");
const checkAuth= require("../middlewear/check-auth");
const fileExtract= require("../middlewear/file");

const router = express.Router();


router.post("", checkAuth,
  fileExtract, postController.createPost);

router.put("/:id",
  checkAuth,
  fileExtract,
  postController.updatePost
);

router.get("",postController.getPost );

router.get("/:id", postController.getPostByID);

router.delete("/:id", checkAuth, postController.deletePost);

module.exports = router;
