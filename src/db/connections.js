const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/employeeRegistration", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("connection successful with mongodb....");
    })
    .catch((e) => {
        console.log(e);
    });
