const express = require("express");
const Student = require("../models/student");
const router = express.Router();
const multer = require("multer");



const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const invalid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("invalid mime type");
      if (invalid) {
          error = null;
      }
      cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post("", multer({ storage: storage }).single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const student = new Student({
      name: req.body.name,
      fathername: req.body.fathername,
      mothername: req.body.mothername,
      address: req.body.address,
      category : req.body.category,
      studentclass : req.body.studentclass,
      imagePath: url + "/images/" + req.file.filename
  })

  student.save().then((createdStudent) => {
      res.status(201).json({
          message: 'data post  sucessfully',
          student: {
              ...createdStudent,
              id: createdStudent._id
          }
      });
  });

});

router.get("/", (req, res, next) => {
  Student.find().then(documents => {
      res.status(200).json({
          message: 'Categories fetched suceesfully',
          students: documents
      });
  })
});

router.get("/:id", (req, res, next) => {
  Student.findById(req.params.id).then(stu => {
      if (stu) {
          res.status(200).json(stu);
      }
      else {
          res.status(404).json({ message: 'Student not found' });
      }
  })
})

module.exports = router;
