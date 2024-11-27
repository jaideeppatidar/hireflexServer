const AssetsModel = require('../models/AssetsModel')
exports.AsstesDocuments = async (req, res) => {
    try {
      const { employeeId, employeeName, assetType, dateGiven ,estimatedValue,serialNumber,insuranceDetails} = req.body; 
      const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      };
      const formatedateGiven = formatDate(dateGiven);
     const AsstesDocuments = new AssetsModel({
        employeeId,
        assetType,
        employeeName,
        dateGiven:formatedateGiven,
        estimatedValue,
        serialNumber,
        insuranceDetails 
      });
      await AsstesDocuments.save();
      res.status(201).json({
        message: "AsstesDocuments created successfully",
        document: AsstesDocuments,
      });
    } catch (error) {
      console.error("Error creating document:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  };
  exports.getAllAsstesDocuments = async (req, res) => {
    try {
      const assetsAll = await AssetsModel.find();
      res.status(200).json({ message: " Get All Meetings retrieved successfully", assetsAll });
    } catch (error) {
      console.error("Error fetching meetings:", error);
      res.status(500).json({ error: "An error occurred while fetching the meetings" });
    }
  };

  exports.AsstesDocumentsEdite = async (req, res) => {
    try {
      const { assetsId } = req.params; 
      const { employeeId, employeeName, assetType, dateGiven, estimatedValue, serialNumber, insuranceDetails } = req.body;
      const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      };
      const formatedateGiven = formatDate(dateGiven);
        const AsstesDocumentsEdite = await AssetsModel.findOneAndUpdate(
          { assetsId }, 
        {
          employeeId,
          employeeName,
          assetType,
          dateGiven:formatedateGiven,
          estimatedValue,
          serialNumber,
          insuranceDetails,
        },
        { new: true, runValidators: true } 
      );
  
      if (!AsstesDocumentsEdite) {
        return res.status(404).json({
          error: "Asset document not found.",
        });
      }
  
      res.status(200).json({
        message: "Asset document updated successfully.",
        document: AsstesDocumentsEdite,
      });
    } catch (error) {
      console.error("Error updating document:", error);
        res.status(500).json({
        error: error.message || "An unexpected error occurred while updating the asset document.",
      });
    }
  };

  exports.AsstesDocumentsDelete = async (req, res) => {
    try {
      const { assetsId } = req.params; 
      const deletedAsset = await AssetsModel.findOneAndDelete({ assetsId });
      if (!deletedAsset) {
        return res.status(404).json({
          error: "No asset document found for the provided ID.",
        });
      }
      res.status(200).json({
        message: "Asset document deleted successfully.",
        document: deletedAsset, 
      });
    } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({
        error: error.message || "An unexpected error occurred.",
      });
    }
  };

  exports.AsstesDocumentsById = async (req, res) => {
    try {
      const { assetsId } = req.params; 
        const asset = await AssetsModel.findOne({
          assetsId
      });
  
      if (!asset) {
        return res.status(404).json({
          error: "No asset document found for the provided ID.",
        });
      }
  
      res.status(200).json({
        message: "Asset  document fetched byid successfully.",
        document: asset,  
      });
    } catch (error) {
      console.error("Error fetching asset document:", error);
      res.status(500).json({
        error: error.message || "An unexpected error occurred.",
      });
    }
  };
  