// const upload = require("../middleware/file");
// const express = require("express");
// const mongoose = require("mongoose");
// const router = express.Router();
// const Grid = require("gridfs-stream");

// const conn = mongoose.createConnection('mongodb+srv://liza:lizfiz1@foodhawk.uitlt.mongodb.net/data?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// let gfs;

// conn.once("open", function () {
//   gfs = Grid('mongodb+srv://liza:lizfiz1@foodhawk.uitlt.mongodb.net/data?retryWrites=true&w=majority', mongoose.mongo);
//   gfs.collection("photos");
//   });


// router.get("/file/:filename", async (req, res) => {
//     try {
//       const file = await gfs.files.findOne({ filename: req.params.filename });
//       const readStream = gfs.createReadStream(file.filename);
//       readStream.pipe(res);
//     } catch (error) {
//       res.send("not found");
//     }
//   });
  
//   router.delete("/file/:filename", async (req, res) => {
//     try {
//       await gfs.files.deleteOne({ filename: req.params.filename });
//       res.send("success");
//     } catch (error) {
//       console.log(error);
//       res.send("An error occured.");
//     }
//   });

// router.post("/upload", upload.single("file"), async (req, res) => {
//     console.log(req.file);
//     if (req.file === undefined) return res.send("you must select a file.");
//     const imgUrl = `http://localhost:7000/file/${req.file.filename}`;
//     return res.send(imgUrl);
// });

// module.exports = router;