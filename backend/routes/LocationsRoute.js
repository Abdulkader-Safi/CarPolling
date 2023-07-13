const express = require("express");
const router = express.router();
const LocattionController = require("../controller/LocationsController");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "/",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

router.post("/addLocations", LocattionController.addLocations);
router.get("/getAllLocations", LocattionController.getAllLocations);