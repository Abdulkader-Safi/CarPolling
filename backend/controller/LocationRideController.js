const LocationRide = require("../model/locationRide");
const locations = require("../model/locations");

exports.addStops = async (req, res) => {
    try {
        const Location = await locations.findById(req.body.locationId);
        if(!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        const ride = await ride.findById(req.body.rideId);
        if(!ride){
            return res.status(404).json({ message: "Ride not found" });
        }
        const lastPosition = await LocationRide.findOne({ ride: ride._id}, {}, { sort: { position: -1 }, limit: 1});
        const newPosition = lastPosition ? lastPosition.position +1 : 1;

        const data = new LocationRide({
            location: location._id,
            ride: ride._id,
            position: newPosition,
        });
        const savedData = await data.save();
        res.status(200).json(savedData);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
};