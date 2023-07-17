const express = require("express");
const router = express.router();
const RideController = require("../controller/RideController");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "/",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

router.post("/addRide", RideController.addRide);
router.get("/getAllRide", RideController.getAllRide);
router.get("/getRideByID", RideController.getRideByID);
router.get("/getRideForDriverByID", RideController.getRideForDriverByID);
router.get("/searchRideByFromToLocat", RideController.searchRideByFromToLocat);
router.patch("/updateRideByID", RideController.updateRideByID);
router.delete("/deleteRideByID", RideController.deleteRideByID);