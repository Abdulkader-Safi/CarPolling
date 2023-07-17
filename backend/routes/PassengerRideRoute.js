const express = require("express");
const router = express.router();
const PassengerRideController = require("../controller/PassengerRideController");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "/",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer ({storage});

router.post("/addPassengerRide", PassengerRideController.addPassengerRide);
router.get("/getAllPassengerForRideByID", PassengerRideController.getAllPassengerForRideByID);
router.get("/getPassengerRideWithPassInfo", PassengerRideController.getPassengerRideWithPassInfo);
router.get("/getPassengerRidePopUserRideLocat", PassengerRideController.getPassengerRidePopUserRideLocat);
router.patch("/updatePassengerRideByUserId", PassengerRideController.updatePassengerRideByUserId);
router.patch("/updatePassengerRideByRideId", PassengerRideController.updatePassengerRideByRideId);
router.delete("/deletePassengerFromRide", PassengerRideController.deletePassengerFromRide);