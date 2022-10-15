const express = require("express");
const passport = require("passport");
const multer = require("multer");

//utils
const s3Upload = require("../../utils/s3");
const db = require("../../db");

const Router = express.Router();

// Multer Config
const storage = multer.memoryStorage();
const upload = multer({ storage });

/*
Route     /
Des       
Params    none
Access    Public
Method    POST  
*/
Router.post("/uploadfile/:_id/:folderName", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const user_id = req.params._id;
    const folderName = req.params.folderName;

    // s3 bucket options
    const bucketOptions = {
      Bucket: "finlo",
      Key: `${folderName}/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      //   ACL: "public-read", // Access Control List
    };

    const uploadImage = await s3Upload(bucketOptions);
    // console.log(uploadImage.Location, file.originalname, file.mimetype);
    // console.log(
    //   user_id,
    //   file.originalname,
    //   uploadImage.Location,
    //   file.mimetype,
    //   file.size
    // );
    const id = 0;
    const q =
      "INSERT INTO customer_documents (`customer_documents_id`, `customer_id`, `document_name`, `document_link`, `document_type`, `document_Size`, `folder_name`) VALUES (?)";
    const values = [
      id,
      user_id,
      file.originalname,
      uploadImage.Location,
      file.mimetype,
      file.size,
      folderName
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err.message);
      // else console.log(data);
      return res
        .status(200)
        .json({ message: "File uploaded successfully", data });
    });
    // return res.status(200).json({ uploadImage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route     /
Des       
Params    none
Access    Public
Method    POST  
*/
Router.post(
  "/uploadfolder/:_id/:folderName",
  upload.single("file"),
  async (req, res) => {
    try {
      const user_id = req.params._id;
      const folderName = req.params.folderName;
      console.log(req.params);
      // s3 bucket options
      const bucketOptions = {
        Bucket: "finlo",
        Key: `${folderName}/`,
        Body: `${folderName}`,
        // ContentType: file.mimetype,
        //   ACL: "public-read", // Access Control List
      };
      const uploadImage = await s3Upload(bucketOptions);
      const values = [0, folderName];
      const q =
        "INSERT INTO user_folders (`user_id`, `folder_name`) VALUES (?)";
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err.message);
        return res
          .status(200)
          .json({ message: "File uploaded successfully", data });
      });
      // return res.status(200).json({ uploadImage });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

/*
Route     /
Des       
Params    none
Access    Public
Method    POST  
*/
Router.get(
  "/get-user-folders/:_id",
  upload.single("file"),
  async (req, res) => {
    try {
      const q = "SELECT * FROM user_folders Where user_id = 0";
      db.query(q, (err, data) => {
        if (err) return res.status(500).json(err.message);
        // else console.log(data);
        return res.status(200).json({ data });
      });
    } catch (error) {}
  }
);
/*
Route     /
Des       Uploads given image to S3 bucket, and saves file link to mongodb
Params    none
Access    Public
Method    POST  
*/
Router.get("/get-user-docs/:_id/:folderName", upload.single("file"), async (req, res) => {
  try {
    const folder_name = req.params.folderName
    console.log(folder_name);
    const q = `SELECT * FROM customer_documents Where folder_name = (?)`;
    db.query(q, [folder_name],(err, data) => {
      if (err) return res.status(00500).json(err.message);
      // else console.log(data);
      return res.status(200).json({ data });
    });
  } catch (error) {}
});

module.exports = Router;
