const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema(
  {
    username: {
      unique: true,
      type: String,
      required: true,
      minLength: 4,
      maxLength:12,
    },

    email:{
      unique: true,
      type: String,
      required:true,
      minLength: 4,
      maxLength:50,

    },
    
    password:{
      type: String,
      required:true,
      minLength: 4,
      maxLength:100,

    },

    refreshTokens:{
      type: Array
    }

   

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);