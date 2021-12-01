const mongoose = require("mongoose")


const RoutineSchema = new mongoose.Schema(
  {
   

    name: {
      type: String,
      required: true,
      minlength:4,
      maxlength: 20,
    },

    excercises: {
      type: Array,
      

    },


    owner:{
      required:true,
        type: String,
        
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Routine", RoutineSchema);