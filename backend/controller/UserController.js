const User = require("../model/user");

exports.register = async (req, res) => {
  try {
    const file = req.file;
    const data = new User({
      fullName: req.body.fullName,
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      smoking: req.body.smoking,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      location: req.body.location,
      image: file.path,
    });

    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserByID = async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserByID = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await User.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
