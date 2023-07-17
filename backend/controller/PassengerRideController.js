const passengerRide = require("../model/passengerRide");
const PassengerRide = require("../model/passengerRide");

exports.addPassengerRide = async (req, res) => {
    try{
        const user = await User.findById(req.body.userId);
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const ride = await ride.findById(req.body.rideId);
        if(!ride){
            return res.status(404).json({ message: "Ride not found" });
        }
        const data = new PassengerRide({
            user: user._id,
            ride: ride._id,
        });
        const savedData = await data.save();
        res.status(400).json({message: error.message });
    }catch(error){
        res.status(400).json({ message: error.message});
    }
};

exports.getAllPassengerForRideByID =  async (req, res) => {
    try {
        const {rideId} = req.params;
        const ride = await ride.findById(rideId);
        // Find all passengerRide records for the given rideId 
        const passengerRides = await PassengerRide.find({ ride: rideId });

        // Extract the user IDs from the passengerRides
        const userIds = passengerRides.map((passengerRide) => passengerRide.user);

        //Query the "user" model with the extracted user IDs
        const users = await User.find({_id: { $in: userIds} });

        // Query the "passenger" model with the extracted user IDs
    const passengers = await Passenger.find({ user: { $in: userIds } });

    // Combine user and passenger information
    const passengerData = users.map((user) => {
      const passenger = passengers.find((p) => p.user.toString() === user._id.toString());
      const passengerRide = passengerRides.find((pr) => pr.user.toString() === user._id.toString());
      return {
        user: {
          _id: user._id,
          fullName: user.fullName,
          userName: user.userName,
          smoking: user.smoking,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          location: user.location,
          image: user.image,
        },
        passengerRate: passenger ? passenger.passengerRate : null,
        status: passengerRide ? passengerRide.status : "Pending",
        ride: {
          _id: ride._id,
        },
      };
    });

    res.json(passengerData);
    }catch(error){
        console.error(err);
    res.status(500).json({ message: "Server Error" });
    }
};

exports.deletePassengerFromRide = async (req, res) => {
    try{
        const userId = mongoose.Types.ObjectId.createFromHexString(req.params.userId);
        const rideId = mongoose.Types.ObjectId.createFromHexString(req.params.rideId);
        const passengerRide = await PassengerRide.findOneAndDelete({
          user: userId,
          ride: rideId,
        });
        if (!passengerRide) {
          return res.status(404).json({ message: "Passenger ride not found" });
        }
        res.status(200).json({ message: "Passenger ride deleted successfully" });    
    } catch (error) {
        res.status(400).json({ message: error.message });
      }
};
//get passengerRide with passenger information

exports.getPassengerRideWithPassInfo = async (req, res) => {
  try {
    const data = await passengerRide.findById(req.params.id).populate("passenger");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update passengerRide by userId
exports.updatePassengerRideByUserId = async (req, res) =>{
  try {
    const { userId } = req.params; // Extract the user ID from the request parameters
    const { status } = req.body; // Assuming the updated status is sent in the request body

    // Update the passengerRide document by user ID
    const updatedPassengerRide = await PassengerRide.findOneAndUpdate({ user: userId }, { status }, { new: true });

    if (!updatedPassengerRide) {
      return res.status(404).json({ error: "Passenger ride not found" });
    }

    res.json(updatedPassengerRide);
  } catch (error) {
    res.status(500).json({ error: "Failed to update passenger ride status" });
  }
};
// Get all passengerRide for a specific user with populated user, ride, and FromLocation information
exports.getPassengerRidePopUserRideLocat = async (req, res) =>{
  try {
    const userId = req.params.userId;
    const passengerRides = await PassengerRide.find({ user: userId })
      .populate({
        path: "user",
        model: "user",
      })
      .populate({
        path: "ride",
        populate: [
          {
            path: "FromLocation",
            model: "locations",
          },
          {
            path: "ToLocation",
            model: "locations",
          },
        ],
      });

    if (!passengerRides || passengerRides.length === 0) {
      return res.status(404).json({ message: "No passengerRides found for the specified user" });
    }
    res.status(200).json(passengerRides);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//update status inside passengerRide by rideId
exports.updatePassengerRideByRideId = async (req, res) => {
  try {
    const { rideId, userId } = req.params;
    const { status } = req.body;

    // Validate status value
    const validStatusValues = ["Pending", "Approved", "Rejected"];
    if (!validStatusValues.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Add authentication and authorization checks here if required

    // Update the passengerRide document by ride ID
    const updatedPassengerRide = await PassengerRide.findOneAndUpdate(
      { ride: rideId, user: userId },
      { status },
      { new: true }
    );

    if (!updatedPassengerRide) {
      return res.status(404).json({ error: "Passenger ride not found" });
    }

    res.json(updatedPassengerRide);
  } catch (error) {
    res.status(500).json({ error: "Failed to update passenger ride status" });
  }
};