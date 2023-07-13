const express = require("express");
const router = express.router();
const CarController = require("../controller/CarController");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "/",
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

router.post("/addCar", CarController.addCar);
router.get("/getCarByID", CarController.getCarByID);
router.patch("/updateCarByID", CarController.updateCarByID);
router.delete("/deleteCarByID", CarController.deleteCarByID);