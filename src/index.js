const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require("dotenv").config()
const mongoose = require('mongoose');
const excerciseRoute = require("./routes/excercises")
const excerciseTemplatesRoute = require("./routes/excerciseTemplates")
const routineRoute = require("./routes/routines")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const path = require("path")


const app = express()


//DB
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected'))
    .catch(err => console.log(err))




//MIDDLEWARE
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json());


//ROUTES
app.use("/api/excerciseTemplates", excerciseTemplatesRoute);
app.use("/api/excercise", excerciseRoute);
app.use("/api/routine", routineRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);


app.use(express.static(path.join(__dirname, "../client/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});



app.listen(process.env.PORT || 8080, () => {
    console.log("backend opened on port 8080")
})