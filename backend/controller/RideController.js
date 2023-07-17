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

exports.searchRideByFromToLocat = async (req, res) =>{
  const { from, to } = req.params;
  const { date } = req.query;

  if (!from || !to || !date) {
    return res.status(400).json({ message: "Please provide 'from', 'to', and 'date' parameters" });
  }

  try {
    const rides = await Ride.find({
      $and: [
        {
          $or: [
            { FromLocation: from },
            {
              _id: {
                $in: await LocationRide.find({ location: from }).distinct("ride"),
              },
            },
          ],
        },
        {
          $or: [
            { ToLocation  : to },
            {
              _id: {
                $in: await LocationRide.find({ location: to }).distinct("ride"),
              },
            },
          ],
        },
        { rideDate: date },
      ],
    })
      .populate({
        path: "FromLocation",
        select: "cities",
      })
      .populate({
        path: "ToLocation",
        select: "cities",
      })
      .populate({
        path: "user",
      });

    // Get locationRide records for the rides
    const rideIds = rides.map((ride) => ride._id);
    const locationRides = await LocationRide.find({
      ride: { $in: rideIds },
    }).populate("location");

    // Map locationRide records to their respective rides
    const rideLocations = locationRides.reduce((acc, locationRide) => {
      const { ride, location } = locationRide;
      if (!acc[ride]) {
        acc[ride] = [];
      }
      acc[ride].push(location);
      return acc;
    }, {});

    // Get the driver information based on the user ID within the ride
    const ridesWithDriverInfo = await Promise.all(
      rides.map(async (ride) => {
        const driver = await Driver.findOne({ user: ride.user._id });
        return {
          ...ride.toObject(),
          user: {
            ...ride.user.toObject(),
            driver: driver.toObject(),
          },
          locations: rideLocations[ride._id] || [],
        };
      })
    );

    res.json({ rides: ridesWithDriverInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};