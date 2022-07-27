const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose
.connect(
    process.env.DATABASE_URL,
    {useNewUrlParser: true,
    useUnifiedTopology: true,}
    )
.then(()=> console.log("Connected to DB!"),
mongoose.set("debug", true))
.catch((err) => console.log(err));



app.use("/employees", require("./routes/employees"));
app.use("/departments", require("./routes/departments"));
app.use("/organisations", require("./routes/organisations"));
app.listen(process.env.PORT, ()=> console.log("Server is up!"));