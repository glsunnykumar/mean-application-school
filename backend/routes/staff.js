const express = require("express");
const Student = require("../models/staff");
const router = express.Router();
const multer = require("multer");
const Staff = require("../models/staff");


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
    const staff = new Staff({
        name: req.body.name,
        qualification: req.body.qualification,
        classteacher: req.body.classteacher,
        testimonial: req.body.testimonial,
        imagePath: url + "/images/" + req.file.filename
    })
  
    staff.save().then((createdStaff) => {
        res.status(201).json({
            message: 'staff created sucessfully',
            staff: {
                ...createdStaff,
                id: createdStaff._id
            }
        });
    });
  
  });

  router.get("/", (req, res, next) => {
    Staff.find().then(documents => {
        res.status(200).json({
            message: 'Staff fetched suceesfully',
            staff: documents
        });
    })
  });
  
  router.get("/:id", (req, res, next) => {
    Staff.findById(req.params.id).then(stu => {
        if (stu) {
            res.status(200).json(stu);
        }
        else {
            res.status(404).json({ message: 'staff not found' });
        }
    })
  })

  module.exports = router;