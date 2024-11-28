const PerksModel = require("../models/PerksModel");
exports.PerksDocument = async (req, res) => {
  try {
    const { perksName, url, description,category } = req.body;
    const image = req.file ? req.file.path : null;
    const perksDocument = new PerksModel({
      perksName,
      description,
      url,
      image,
      category
    });
    await perksDocument.save();
    res.status(201).json({
      message: "Document created successfully",
      document: perksDocument,
    });
  } catch (error) {
    console.error("Error creating document:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};

exports.PerksDocumentEdite = async (req, res) => {
  try {
    const { perksId } = req.params;
    const { perksName, url, description ,category} = req.body;
    const image = req.file ? req.file.path : null;
    const perksDocument = await PerksModel.findOneAndUpdate({ perksId });
    perksDocument.perksName = perksName || perksDocument.perksName;
    perksDocument.category = category || perksDocument.category;
    perksDocument.description = description || perksDocument.description;
    perksDocument.url = url || perksDocument.url;
    if (image) perksDocument.image = image;
    await perksDocument.save();
    res.status(200).json({
      message: "Document updated successfully",
      document: perksDocument,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};

exports.getAllPerksDocument = async (req, res) => {
  try {
    const perksDocument = await PerksModel.find();
    res.status(200).json({
      message: "Documents fetched successfully",
      perksDocument, 
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

exports.deletePerkDocument = async (req, res) => {
    try {
      const { perksId } = req.params;
      await PerksModel.findOneAndDelete({ perksId });
      res.status(200).json({ message: 'Perks  deleted successfully' });
    } catch (error) {
      console.error('Error deleting document:', error);
      res.status(500).json({ error: error.message || 'An unexpected error occurred' });
    }
  };

  exports.getPerksDocumentById = async (req, res) => {
    try {
      const { perksId } = req.params;
      const perksDocument = await PerksModel.findOne({perksId});
      res.status(200).json({
        message: 'Document  fetched By Id successfully',
        document: perksDocument,
      });
    } catch (error) {
      console.error('Error fetching document:', error);
      res.status(500).json({ error: error.message || 'An unexpected error occurred' });
    }
  };