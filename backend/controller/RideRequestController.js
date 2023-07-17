const RideRequest = require("../model/rideRequest");

exports.addRequest = async (req, res) =>{
    try{
        const { FromLocation, ToLocation, passenger} = req.body;

        //check if the passenger exists as a user 
        const user = await UserActivation.findById(passenger);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        const rideRequest = new RideRequest({
            FromLocation,
            ToLocation,
            passenger,
        });
        const savedRideRequest = await rideRequest.save();
        res.status(201).json(savedRideRequest);
    }catch(error){
        res.status(400).json({ message: error.message});
    }
};

exports.updateRequestById = async (req, res) =>{
    try{
        const id = req.params.id;
        const updateData = req.body;
        const opations = { new: true};
        const result = await RideRequest.findByIdAndUpdate(id, updateData, opations);
        res.send(result);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
};

exports.getAllRequests = async (req, res) =>{
    try{
        const rideRequest = await RideRequest.find();
        res.json(rideRequests);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

exports.deleteRequestById = async (req, res) =>{
    try{
        const rideRequest = await RideRequest.findByIdAndDelete(req.params.id);
        if (!rideRequest){
            return res.status(404).json({ message: "Ride request not found" });
        }
        res.json({ message:"Ride request delete successfully" });
}catch(error){
    res.status(500).json({ message: error.message });
}
};