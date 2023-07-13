const Ride = require("../model/ride");

exports.addRide = async (req, res) => {
    try{
        const userId = req.body.driverId;
        const FromLocation = await Locations.findOne({
          cities: req.body.FromLocation,
        });
        if (!FromLocation) {
          return res.status(404).json({ message: "From location not found" });
        }
    
        const ToLocation = await Locations.findOne({ cities: req.body.ToLocation });
        if (!ToLocation) {
          return res.status(404).json({ message: "To location not found" });
        }
    
        const data = new Ride({
          user: userId,
          rideDate: req.body.rideDate,
          rideTime: req.body.rideTime,
          FromLocation: FromLocation._id,
          ToLocation: ToLocation._id,
          estimatedDuration: req.body.estimatedDuration,
        });
    
        const savedData = await data.save();
        res.status(200).json(savedData);
    }catch (error) {
        res.status(400).json({ message: error.message });
      }
};

exports.getRideByID = async (req, res) => {
    try{
        const ride = await Ride.findById(req.params.id).populate("user"); //to be edited
        if (!ride) {
          return res.status(404).json({ message: "Ride not found" });
        }
        res.json(ride);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

exports.updateRideByID = async (req, res) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await Ride.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};

exports.getAllRide = async (req, res) => {
    try{
        const data = await Ride.find();
        res.json(data);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.deleteRideByID = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await Ride.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted...`);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};

exports.getRideForDriverByID = async (req, res) => {
    const userId = req.params.userId;

    try{
        const rides = await Ride.find({user: userId}).populate("FromLocation ToLocation");
        res.json(rides);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Server error"});
    }
};