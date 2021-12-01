const mongoose = require("mongoose")


const ExcerciseTemplateSchema = new mongoose.Schema(
  {

    name: {
      minlength: 4,
      maxlength: 20,
      type: String,
      required: true,

    },



    picture: {
      type: String,
      required: true,
    },



  },
  { timestamps: true }
);

module.exports = mongoose.model("ExcerciseTemplate", ExcerciseTemplateSchema);