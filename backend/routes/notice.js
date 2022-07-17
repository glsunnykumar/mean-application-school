const express = require("express");
const Notice = require("../models/notice");
const router = express.Router();
const multer = require("multer");



const MIME_TYPE_MAP = {
    'application/pdf': 'pdf',
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
  const notice = new Notice({
      title: req.body.title,
      pubdate: req.body.pubdate,
      imagePath: url + "/images/" + req.file.filename
  })

  notice.save().then((createdNotice) => {
      res.status(201).json({
          message: 'data post  sucessfully',
          Notice: {
              ...createdNotice,
              id: createdNotice._id
          }
      });
  });

});

router.get("/", (req, res, next) => {
 console.log('entering get notice');
  Notice.find().then(documents => {
      res.status(200).json({
          message: 'Categories fetched suceesfully',
          notices: documents
      });
  })
});

router.get("/:id", (req, res, next) => {
  Notice.findById(req.params.id).then(sli => {
      if (sli) {
          res.status(200).json(sli);
      }
      else {
          res.status(404).json({ message: 'Notice not found' });
      }
  })
})

module.exports = router;
