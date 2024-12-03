const MeetingModel = require("../models/MeetingModel");
const userService = require("../services/userServices");

exports.MeetingEmployee = async (req, res) => {
  try {
    const {
      meetingType,
      employeeId,
      reviewDate,
      commentsAndNotes,
      nextMeetingDate,
      meetingURL,
    } = req.body;
    const formatDate = (date) => {
      if (!date) return null;
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}`;
    };
    const formattedReviewDate = formatDate(reviewDate);
    const formattedNextMeetingDate = formatDate(nextMeetingDate);
    const meeting = new MeetingModel({
      meetingType,
      employeeId,
      reviewDate: formattedReviewDate,
      commentsAndNotes,
      nextMeetingDate: formattedNextMeetingDate,
      meetingURL,
    });

    await meeting.save();
    res.status(201).json({ message: "Meeting created successfully", meeting });
  } catch (error) {
    console.error("Error creating meeting:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the meeting" });
  }
};

exports.MeetingEmployeeEdite = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const {
      meetingType,
      employeeId,
      reviewDate,
      commentsAndNotes,
      nextMeetingDate,
      meetingURL,
    } = req.body;
    const formatDate = (date) => {
      if (!date) return null;
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}`;
    };

    const formattedReviewDate = formatDate(reviewDate);
    const formattedNextMeetingDate = formatDate(nextMeetingDate);

    const updatedMeeting = await MeetingModel.findOneAndUpdate(
      { meetingId },
      {
        meetingType,
        employeeId,
        reviewDate: formattedReviewDate,
        commentsAndNotes,
        nextMeetingDate: formattedNextMeetingDate,
        meetingURL,
      },
      { new: true, runValidators: true }
    );
    if (!updatedMeeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    res
      .status(200)
      .json({
        message: "Meeting updated successfully",
        meeting: updatedMeeting,
      });
  } catch (error) {
    console.error("Error updating meeting:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the meeting" });
  }
};

exports.getAllMeetings = async (req, res) => {
  try {
    const meetings = await MeetingModel.find();
    res
      .status(200)
      .json({ message: " Get All Meetings retrieved successfully", meetings });
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the meetings" });
  }
};

exports.MeetingEmployeeDelete = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const deletedMeeting = await MeetingModel.findOneAndDelete({ meetingId });

    if (deletedMeeting) {
      res.status(200).json({ message: "Meeting deleted successfully" });
    } else {
      res.status(404).json({ error: "Meeting not found" });
    }
  } catch (error) {
    console.error("Error deleting meeting:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the meeting" });
  }
};

exports.getMeetingById = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const meeting = await MeetingModel.findOne({ meetingId });
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    res
      .status(200)
      .json({
        message: " Get Data Id Meeting retrieved successfully",
        meeting,
      });
  } catch (error) {
    console.error("Error fetching meeting:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the meeting" });
  }
};
exports.getEmployeeById = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const meeting = await MeetingModel.findOne({ employeeId });
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found ?????" });
    }
    res.status(200).json({
      message: "Meeting retrieved UserId  successfully",
      meeting,
    });
  } catch (error) {
    console.error("Error fetching meeting:", error);
    res.status(500).json({
      error: error.message || "An error occurred while fetching the meeting",
    });
  }
};

