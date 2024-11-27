const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const meetingSchema = new mongoose.Schema(
  {
    meetingId: {
      type: String,
      default: () => uuidv4(), 
      unique: true,            
    },
    meetingType: {
      type: String,
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
    },
    reviewDate: {
      type: String,
      required: true,
    },
    commentsAndNotes: {
      type: String,
      required: false, 
    },
    nextMeetingDate: {
      type: String,
      required: false, 
    },
    meetingURL: {
      type: String,
      required: false, 
      match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 
    },
  },
  {
    timestamps: true, 
  }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;
