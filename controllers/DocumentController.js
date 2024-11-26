const  DocumentModel  = require('../models/DocumentsModel')
exports.EmployeeDocument = async (req, res) => {
    try {
      const { employeeName, employeeId, documentName, uploadDate, status, uploaded } =
        req.body;
      const documentFile = req.file ? req.file.path : null;
      const validUploadDate = new Date(uploadDate);
      if (isNaN(validUploadDate.getTime())) {
        return res.status(400).json({ error: "Invalid upload date" });
      }
      
      const EmployeeDocument = new DocumentModel({
        employeeName,
        employeeId,
        documentName,
        uploadDate: validUploadDate,
        status,
        documentFile,
        uploaded,
      });
      await EmployeeDocument.save();
      res.status(201).json({
        message: "Document created successfully",
        document: EmployeeDocument,
      });
    } catch (error) {
      console.error("Error creating document:", error);
      res
        .status(500)
        .json({ error: error.message || "An unexpected error occurred" });
    }
  };        
  exports.EmployeeDocumentEdite = async (req, res) => {
    try {
      const { documentId } = req.params; 
      const { employeeName, uploadDate, status, uploaded ,documentName} = req.body;
  
      const documentFile = req.file ? req.file.path : null; 
      const validUploadDate = uploadDate ? new Date(uploadDate) : null;
        if (uploadDate && isNaN(validUploadDate.getTime())) {
        return res.status(400).json({ error: "Invalid upload date" });
      }
      const document = await DocumentModel.findOneAndUpdate({documentId});
  
      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }
      if (employeeName) document.employeeName = employeeName;
      if (validUploadDate) document.uploadDate = validUploadDate;
      if (documentName) document.documentName = documentName;
      if (status) document.status = status;
      if (documentFile) document.documentFile = documentFile;
      if (uploaded !== undefined) document.uploaded = uploaded;
  
      await document.save();
  
      res.status(200).json({
        message: "Document updated successfully",
        document,
      });
    } catch (error) {
      console.error("Error updating document:", error);
      res
        .status(500)
        .json({ error: error.message || "An unexpected error occurred" });
    }
  };
  exports.getAllEmployeeDocuments = async (req, res) => {
    try {
      const documents = await DocumentModel.find();
        if (documents.length === 0) {
        return res.status(404).json({ message: "No documents found" });
      }
        res.status(200).json({
        message: "Documents retrieved successfully",
        documents,
      });
    } catch (error) {
      console.error("Error fetching documents:", error);
      res
        .status(500)
        .json({ error: error.message || "An unexpected error occurred" });
    }
  };
  exports.getEmployeeDocumentById = async (req, res) => {
    try {
      const { documentId } = req.params; 
        const document = await DocumentModel.findOne({documentId});
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.status(200).json({
        message: "Document fetch By Id successfully",
        document,
      });
    } catch (error) {
      console.error("Error fetching document:", error);
        if (error.kind === "ObjectId") {
        return res.status(400).json({ error: "Invalid document ID" });
      }
  
      res
        .status(500)
        .json({ error: error.message || "An unexpected error occurred" });
    }
  };
  
  exports.EmployeeDocumentsDelete = async (req, res) => {
    try {
      const { documentId } = req.params; 
      const document = await DocumentModel.findOneAndDelete({ documentId });
      if (!document) {
        return res.status(404).json({
          error: "No asset document found for the provided ID.",
        });
      }
      res.status(200).json({
        message: "Asset document deleted successfully.",
        document: document, 
      });
    } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({
        error: error.message || "An unexpected error occurred.",
      });
    }
  };

