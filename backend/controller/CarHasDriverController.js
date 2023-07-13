const CarHasDriver = require("../model/carHasDriver");

exports.addCarForDriver = async (req, res) =>{
    try{
        const userId = req.body.userId;
        const carId = req.body.carId;
        const carHasDriver = new CarHasDriver({
            car: carId,
            user: userId,
        })
        const savedData = await data.save();
        res.status(200).json(savedData);
    } catch(error){
        res.status(400).json({message: error.message}) 
    }
};

exports.getCarForDriverByUserID = async (req, res) =>{
    const userId = req.params.userId;
    try{
        const carHasDriver = await CarHasDriver.findOne({ user: userId }).populate("car");

        if (!carHasDriver) {
          return res.status(404).json({ error: "User not found or no car associated" });
        }
    
        const car = carHasDriver.car;
        res.json({ car });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
};