const Locations = require("../model/locations");

exports.addLocations = async (req, res) => {
    try{
        const data = new Locations({
            cities: req.body.cities,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
          });
      
          const savedData = await data.save();
          res.status(200).json(savedData);
    }catch (error) {
        res.status(400).json({ message: error.message });
      }
};
exports.getAllLocations = async (req, res) => {
    try{
        const data = await Locations.find();
        res.json(data);
    }catch(error) {
        res.status(500).json({message: error.message});
    }
};