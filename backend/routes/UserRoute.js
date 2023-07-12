const express = require("express");
const router = express.Router();
const UserController = require("./../controller/UserController");

const storage = multer.diskStorage({
  destination: "/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserByID);
router.post("/", upload.single("image"), UserController.register);
router.patch("/:id", UserController.updateUserByID); 