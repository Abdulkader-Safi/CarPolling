const express = require("express");
const router = express.router();
const RideRequestController = require("../controller/RideRequestController");
const multer = require("multer");
const storage = multer.diskStorage({
    destination:"/",
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    },
});
const upload = multer({storage});

router.post("/addRideRequest", RideRequestController.addRequest);
router.get("/getAllRequests", RideRequestController.getAllRequests);
router.patch("/updateRequestById", RideRequestController.updateRequestById);
router.delete("/deleteRequestById", RideRequestController.deleteRequestById);