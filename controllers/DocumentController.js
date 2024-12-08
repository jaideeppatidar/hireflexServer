const  DocumentModel  = require('../models/DocumentsModel')
exports.EmployeeDocument = async (req, res) => {
    try {
      const { employeeName, employeeId, documentName, uploadDate, status, uploaded } =
        req.body;
      const image = req.file ? req.file.filename : null;
      if (!image) {
        return res.status(400).json({ error: "Image file is required" });
      }
      const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(d.getDate()).padStart(2, "0")}`;
      };
      const formatuploadDate = formatDate(uploadDate);
      
      const EmployeeDocument = new DocumentModel({
        employeeName,
        employeeId,
        documentName,
        uploadDate: formatuploadDate,
        status,
        image,
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
  
      const image = req.file ? req.file.filename : null; 
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
      if (image) document.image = image;
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
  exports.EmployeeDocApproveed = async (req, res) => {
    try {
      const { documentId } = req.params;
      const updatedDocument = await DocumentModel.findOneAndUpdate(
        { documentId },
        { status: "Approved" },
        { new: true }
      );
      res.status(200).json({
        message: "Document request approved successfully",
        data: updatedDocument,
      });
    } catch (err) {
      console.error("Error approving Document request:", err);
      res
        .status(500)
        .json({
          message: "Error approving Document request",
          error: err.message,
        });
    }
  };
  exports.EmployeeDocReject = async (req, res) => {
    try {
      const { documentId } = req.params;
      const updatedDocument = await DocumentModel.findOneAndUpdate(
        { documentId },
        { status: "Rejected" },
        { new: true }
      );
  
      res.status(200).json({
        message: "Document request rejected successfully",
        data: updatedDocument,
      });
    } catch (err) {
      console.error("Error rejecting Document request:", err);
      res
        .status(500)
        .json({
          message: "Error rejecting Document request",
          error: err.message,
        });
    }
  };
  exports.getEmployeedDocumentById = async (req, res) => {
    try {
      const { employeeId } = req.params;
      const Document = await DocumentModel.find({employeeId});
      res.status(200).json({
        message: 'employeeId  fetched By Id successfully',
        document: Document,
      });
    } catch (error) {
      console.error('Error fetching document:', error);
      res.status(500).json({ error: error.message || 'An unexpected error occurred' });
    }
  };

