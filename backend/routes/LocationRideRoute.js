const express = require("express");
const router = express.Router();
const LocationRideController = require("../controller/LocationRideController");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: "/",
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    },
});
const upload = multer({storage});

router.post("/addStops", LocationRideController.addStops);