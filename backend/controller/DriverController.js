const Driver = require("../model/driver");

exports.addDriver = async (req, res) => {
    try{
        const file = req.file;
        const data = new Driver({
            driverLicenseImage: req.body.driverLicenseImage,
            driverLicenseType: req.body.driverLicenseType,
            user: user._id,
            driverRate: req.body.driverRate,
        });
        const savedData = await data.save ();
        res.status(200).json(savedData);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
};

exports.getAllDrivers = async (req, res) =>{
    try{
        const data = await Driver.find();
        res.json(data);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.updateDriverByID = async (req, res) =>{
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await driver.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };
    exports.getDriverByID = async (req, res) =>{
        try{
            const driver = await Driver.findOne({ userId: User});
            res.json(driver);
        } catch(error){
            res.status(500).json({ message: "Internal server error"});
        }
    };