const express = require('express');
require("./db/conn");

const Register = require("./models/register")

const path = require('path');
const hbs = require('hbs');
const app = express();
//when we have to host --> envt variable
const port = process.env.PORT || 3000
// const port = 8000

//connect static website//public sttaic path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);

app.use(express.static(static_path));

//routing// app.get(route, callback)
app.get("", (req, res) => {
    res.render('Index');
})
app.get("/about", (req, res) => {
    res.render('Index');
})
app.get("/Category", (req, res) => {
    res.render('Category');
})
app.get("/register", (req, res) => {
    res.render('register');
})
app.get("/login", (req, res) => {
    res.render('login');
})
app.post("/register", async(req, res) => {
  try {
      const password = req.body.password;
      const cpassword = req.body.confirmpassword;
    //   console.log(req.body.confirmpassword);
      if(password === cpassword){
        const registerEmployee = new Register({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword
        })
        const registered = await registerEmployee.save();
        // res.statusCode(201).render("Index");
        res.status(201).render("Index");
      }else{
          res.send("Invalid Login details");
      }
    } catch (error) {
      res.status(400).send(error);
  } 
})
// login check
app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email);
        // console.log(`${email} and password is ${password}`) ;      
    
        const useremail = await Register.findOne({email:email});
        // res.send(useremail.password);
        // console.log(useremail);
        if(useremail.password === password){
            res.status(201).render("Index");
        }else{
            res.send("invalid Login datails please try again!");
        }

    } catch (error) {
        res.status(400).send("invalid Login datails please try again!")
    }

})
app.get("*", (req, res) => {
    res.render('Error404');
})


app.listen(port, () => {
    console.log(`listening to the port at ${port}`)
})
