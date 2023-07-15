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