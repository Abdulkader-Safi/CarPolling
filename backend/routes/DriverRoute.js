const express = require("express");
const router = express.router();
const DriverController = require("../controller/DriverController");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "/",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

router.post("/addDriver", DriverController.addDriver);
router.get("/getAllDrivers", DriverController.getAllDrivers);
router.get("/getDriverByID", DriverController.getDriverByID);
router.patch("/updateDriverByID", DriverController.updateDriverByID);