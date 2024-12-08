
const  PoliciesModel = require ('../models/PoliciesModel')
exports.PoliciesCreate = async (req, res) => {
  try {
      const { policyName, current, description,uploadDate } = req.body;
      const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      };
      const formatteduploadDate = formatDate(uploadDate);
      const currentValue = (current === 'true' || current === true);
      const filePath = req.file ? req.file.filename : null;
        
      const newPolicy = new PoliciesModel({
          policyName,
          uploadDate: formatteduploadDate,
          current:currentValue,
          file: filePath, // Save only the file path as a string
          description,
      });

      const savedPolicy = await newPolicy.save();
      res.status(201).json(savedPolicy);
  } catch (err) {
      res.status(500).json({ message: "Error creating policy", error: err.message });
  }
};


exports.PoliciesDocumentEdite =  async (req, res) => {
    try {
        const { policiesId } = req.params;
        const { policyName, current, description,uploadDate } = req.body;
        const formatDate = (date) => {
          if (!date) return null;
          const d = new Date(date);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        };
        const formatteduploadDate = formatDate(uploadDate);
        const currentValue = (current === 'true' || current === true);

        const updatedPolicy = await PoliciesModel.findOneAndUpdate(
            {policiesId},
            {
                policyName,
                current:currentValue,
                description,
                file: req.file ? req.file.filename : undefined,
                uploadDate: formatteduploadDate, 
            },
            { new: true, runValidators: true }
        );
        if (!updatedPolicy) return res.status(404).json({ message: "Policy not found" });
        res.status(200).json(updatedPolicy);
    } catch (err) {
        res.status(500).json({ message: "Error updating policy", error: err.message });
    }
};

exports.getAllPolicies = async (req, res) => {
    try {
      const policiesAll = await PoliciesModel.find();
      res.status(200).json({ message: " Get All policies retrieved successfully", policiesAll });
    } catch (error) {
      console.error("Error fetching meetings:", error);
      res.status(500).json({ error: "An error occurred while fetching the meetings" });
    }
  };

  exports.deletePolicies = async (req, res) => {
    try {
      const { policiesId } = req.params;
      await PoliciesModel.findOneAndDelete({ policiesId });
      res.status(200).json({ message: 'Policies   deleted successfully' });
    } catch (error) {
      console.error('Error deleting document:', error);
      res.status(500).json({ error: error.message || 'An unexpected error occurred' });
    }
  };

  exports.getPoliciesDocumentById = async (req, res) => {
    try {
      const { policiesId } = req.params;
      const policiesDocument = await PoliciesModel.findOne({policiesId});
      res.status(200).json({
        message: 'Policies  fetched By Id successfully',
        document: policiesDocument,
      });
    } catch (error) {
      console.error('Error fetching document:', error);
      res.status(500).json({ error: error.message || 'An unexpected error occurred' });
    }
  };