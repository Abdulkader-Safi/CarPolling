const Passenger = require("../model/passenger");

exports.addPassenger = async (req, res) => {
    try{
        const user = await UserActivation.findByID(req.body.userId);
        if(!user) {
            return res.status(404).json({ message: "User not found " });
        }
        const data = new Passenger({
            passengerRate: req.body.passengerRate,
            user: user._id,
        });
        const savedData = await data.save();
        res.status(200).json({ savedData });
    }catch(error){
        res.status(400).json({ message: error.message });
    }
};

exports.getPassengerByID = async (req, res) => {
    try{
        const data = await Passenger.findById(req.params.id).populate("user");
        res.json(data);
    }catch (error){
        res.status(500).json({ message: error.message });
    }
};

exports.getAllPassenger = async (req, res) => {
    try{
        const data = await Passenger.find();
        res.json(data);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

exports.updatePassengerByID = async (req, res) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await Passenger.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
    }catch(error) {
        res.status(400).json({ message: error.message });
    }
};