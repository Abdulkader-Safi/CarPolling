const express = require("express");
const router = express.router();
const PassengerController = require("../controller/PassengerController");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "/",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer ({storage});

router.post("/addPassenger", PassengerController.addPassenger);
router.get("/getAllPassenger", PassengerController.getAllPassenger);
router.get("/getPassengerByID", PassengerController.getPassengerByID);
router.patch("/updatePassengerByID", PassengerController.updatePassengerByID);