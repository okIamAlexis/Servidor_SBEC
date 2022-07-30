const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const cors =  require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

//RPUTES

const useRoute = require('./app/routes/route')
app.use('/user', useRoute);

module.exports = app;




// app.use(express.urlencoded({extended:false}));


// app.set("port", process.env.PORT || 4200);

// app.use(express.json());


// ROUTES 
// const userRoute = require('./app/routes/route')

// Llamar al router
// app.use('/', require('./app/routes/route'))
// app.use('/api', (req,res) => {
//     res.json({message: "Hola"});
// })
// app.use('/', require('./app/routes/route'))

// app.listen(app.get("port"), ()=> {
//     console.log("Servidor en puerto 4200", app.get("port"));
// })

