const mongoose = require("mongoose")


const ExcerciseSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: true,

    },

    repetitions: {

      type: Array,
      required: true,

    },

    weight: {
      type: Number,
      required: true,
    },

    owner:{

      type:String,
      required:true
    },



    picture: {
      type: String,
      default: "https://res.cloudinary.com/ewcomcloud/image/upload/v1635641719/default_yspyxm.png",
      
    },



  },
  { timestamps: true }
);

module.exports = mongoose.model("Excercise", ExcerciseSchema);