/*const express = require('express');
const hbs = require('express-handlebars')
const path = require('path');
 
const app = express();


const PORT = process .env.PORT || 3000;
//Settings
app.set("view engine", ".hbs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));

//Handlebars Config
app.engine('.hbs' , hbs({
    defaultLayout: "main",
    layoutDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: ".hbs"
}))

app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/productos', (req, res)=>{
    res.render('productos');
})

app.get('/nosotros', (req, res)=>{
    res.render('nosotros');
})

app.get('/contactos', (req, res)=>{
    res.render('contactos');
})

app.use((req, res)=>{
    res.send('404');
})

app.listen(PORT, ()=>{
    console.log(`Server at http://localhost:${PORT}`);
})*/

const { request } = require('express');
const express = require('express' );
const app = express();
const hbs = require('express-handlebars');
const path = require('path')
const nodemailer = require('nodemailer');
const { env } = require('process');
require('dotenv').config();
//Config Mail//
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASS, // generated ethereal password
    },
  });
  transporter.verify().then(()=>{
      console.log("Listo para enviar correo!");
  });
//Settings//
app.set("view engine", ".hbs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({
    extended: false
}));

app.engine('.hbs', hbs({
    defaultLayout: "main",
    layoutDir: path.join(app.get('views'),'layouts'),
    partialsDir : path.join(app.get('views'), 'partials'),
    extname :"hbs"
}));

const PORT = process.env.PORT || 3000;

app. post ('/Contacto', async(req, res)=>{
    // send mail with defined transport object
   await transporter.sendMail({
   from: process.env.MAIL_USER, // sender address
   to:process.env.MAIL_USER, // list of receivers
   subject: `${req.body.name} Requere de su atención sobre ${req.body.asunto}`, // Subject line
   html: `<h1>Nombre:${req.body.fullname}</h1>
       <h1>Correo:${req.body.email}</h1>
       <h1>Telefono:${req.body.telefono}</h1>
       <h1>Empresa:${req.body.asunto}</h1>
       <h1>Solicita la siguiente información:</h1>
   <h1>${req.body.message}</h1>` // html body
 });
   res.redirect('/');
})

app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/productos', (req, res)=>{
    res.render('productos');
})

app.get('/nosotros', (req, res)=>{
    res.render('nosotros');
})

app.get('/contactos', (req, res)=>{
    res.render('contactos');
})

app. use ((req, res)=>{
    res.render('404',{
        ruta:'/Styles/404.css'
    });
})

app.listen(PORT, ()=>{
    console.log(`Server at http://localhost:${PORT}`);
})


