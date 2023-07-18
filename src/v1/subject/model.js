const mongoose = require("mongoose");
const constant = require("../../../config/constant");

const subjectSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
      default: null,
    },
    class_Name: {
      type: String,
      trim: true,
      default: null,
    },
    subject_Name: {
      type: String,
      trim: true,
      default: null,
    },
    volume: [
      {
        volumeNo: {
          type: String,
          default: null,
        },
        chapter: [
          {
            chapter_Name: {
              type: String,
              default: null,
            },
            chapterDetails: [
              {
                chapterDetails_Name: {
                  type: String,
                  trim:true,
                  default: null,
                  _id:false
                },
              },
            ],
          },
        ],
      },
    ],
    deletedAt: {
      type: Date,
      default: null,
      select: false,
    },
    deletedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
      select: false,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const Subjects = mongoose.model(constant.collections.subjects, subjectSchema);

module.exports = { Subjects };
