const express = require("express");
const Slide = require("../models/slide");
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
 console.log(req.body);
  const url = req.protocol + "://" + req.get("host");
  const slide = new Slide({
      heading: req.body.heading,
      subheading: req.body.subheading,
      imagePath: url + "/images/" + req.file.filename
  })

  slide.save().then((createdSlide) => {
      res.status(201).json({
          message: 'data post  sucessfully',
          slide: {
              ...createdSlide,
              id: createdSlide._id
          }
      });
  });

});

router.get("/", (req, res, next) => {
  Slide.find().then(documents => {
      res.status(200).json({
          message: 'Categories fetched suceesfully',
          slides: documents
      });
  })
});

router.get("/:id", (req, res, next) => {
  Slide.findById(req.params.id).then(sli => {
      if (sli) {
          res.status(200).json(sli);
      }
      else {
          res.status(404).json({ message: 'Slide not found' });
      }
  })
})

module.exports = router;
