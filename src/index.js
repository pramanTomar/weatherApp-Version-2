const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 3000;

// hosting 
const staticPath = path.join(__dirname,"../public");
app.use(express.static(staticPath));


const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Routing .....

app.get('',(req,res)=>{
    res.render('index');
})

app.get('/home',(req,res)=>{
    res.render("index");
})

app.get('/about',(req,res)=>{
    res.render("about");
})

app.get('/weather',(req,res)=>{
    res.render("weather");
})

app.get('*',(req,res)=>{
    res.render("404page");
})

// Listening...........`
app.listen(port,()=>{
    console.log(`Listening on port no ${port}`)
})