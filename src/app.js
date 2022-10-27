const express = require("express");
const app = express();
const path = require("path");

//to see the form data in browser and getting the form data we have to use
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./db/connections");

const { json } = require("express");
app.use(express.json());
const hbs = require("hbs");
const port = process.env.PORT || 3000;

const Register = require("./models/employees");
const { resolveSoa } = require("dns/promises");

//getting the path of public folder for the website
const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));
//---------------------------------------------
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/views");
//setting the view engine
app.set("view engine", "hbs");
app.set('views', template_path);   //setting the viws folder as render
hbs.registerPartials(partial_path);


//for home page rendering
app.get("/", (req, res) => {
    // res.render("index");
    res.render("login");
})
//rendering when localhost:3000/register will be used
app.get("/register", (req, res) => {
    res.render("register");
})
//getting the data from the form we will submit.........
//the name attribute must be present
//and should be same as the schema defined
app.post("/register", async (req, res) => {
    try {

        //checking the password same or not
        const password = req.body.password;
        const confpassword = req.body.confirmpassword;



        // console.log(req.body.)

        if (password === confpassword) {

            const registerEmployees = new Register({
                fullname: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword,
                gender: req.body.gender


            })

            //use hash before saving to database and after getting the data -- MIDDLEWARE CONCEPT
            // getting the data store it 
            const registeredData = await registerEmployees.save();
            res.status(201).send(registeredData);


        } else res.send("passwords are not matching");



    } catch (e) {
        res.status(400).send(e);
    }
})

app.get("/login", (req, res) => {
    res.render("login.hbs");
})

//login setup
app.post("/login", async (req, res) => {
    try {
        const useremail = req.body.userName;
        const userPassword = req.body.userPassword;

        const uemail = await Register.findOne({ email: useremail });


        // res.send(uemail.password);  //to see the password of that particular document
        if (userPassword === uemail.password) {
            res.status(201).send(`login successful`);
        } else res.status(400).send("invalid creditianls! Please enter correct details");

    } catch (e) {
        res.status(400).send("invalid creditianls! Please enter correct details");
    }
})

app.listen(process.env.PORT || 4500, () => {
    console.log(`connection is setup at port ${port}`);
})