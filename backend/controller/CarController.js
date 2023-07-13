const Car = require("../model/car");

exports.addCar = async (req, res) =>{
    try{
        const file = req.file;
        const data = new Car({
          carType: req.body.carType,
          carModel: req.body.carModel,
          carCondition: req.body.carCondition,
          seatsAvailable: req.body.seatsAvailable,
          luggageAvailable: req.body.luggageAvailable,
          carInsuranceImage: file.path,
        });
    
        const savedData = await data.save();
        res.status(200).json(savedData);
      }catch (error) {
        res.status(400).json({ message: error.message });
      }
};

exports.getCarByID = async (req, res) =>{
    try{
        const data = await Car.findById(req.params.id);
        res.json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

exports.updateCarByID = async (req, res) =>{
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await Car.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};

exports.deleteCarByID = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await Car.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted..`);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};