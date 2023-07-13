const express = require("express");
const router = express.router();
const CarHasDriverController = require("../controller/CarHasDriverController");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "/",
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

router.post("/addCarForDriver", CarHasDriverController.addCarForDriver);
router.get("/getCarForDriverByUserID", CarHasDriverController.getCarForDriverByUserID);