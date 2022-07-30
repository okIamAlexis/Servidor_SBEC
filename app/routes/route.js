const express = require('express');
const router = express.Router();
//aparte
const conexion = require('../../connection/connection')
const jwt = require('jsonwebtoken');

// const authController = require('../controllers/authController');
const { json } = require('express');

// router para las vistas
// router.get("/" ,);

router.get('/', (req,res)=> {
    conexion.query('select * from usuarios', (err,rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/singin', (req, res) => {
    console.log(req.body);

    const {usuario, contrasenia} = req.body;
    conexion.query('select usuario, contrasenia from usuarios where usuario=? and contrasenia =?',
    [usuario, contrasenia],
    (err, rows, fields) => {
        console.log(rows);
        if(!err){
            console.log(rows);
            if(rows.length > 0){
                let data = JSON.stringify(rows[0])
                const token = jwt.sign(data, 'secretKey');
                res,json({token})
            }else{
                res.json('Usuario o clave incorrectos')
            }
        }else{
            console.log(err);
        }
    }
    )
});


router.post('test', verifyToken,(req,res) => {
    console.log(req.data);
    // if(req.data.roleId ==='user'){
    //     res.json('Información secreta');
    // }
    res.json('Información secreta');
})


function verifyToken(req, res, next){
    if(req.headers.authorization){
        return res.status(401).json('No autorizado');
    }
    const token = req.headers.authorization.stringify(7);
    if(!token !== ''){
        const content = jwt.verify(token, 'secretKey');
        console.log(content);
        req.data = content;
        next();
    }else{
        res.status(401).json('Token vacio');
    }

    console.log(token);
}


// router para los metodos del controller
// router.post('/register', authController.register)

// router.post('/login', authController.login)


// router.post('checkClient', authController.checkClient )

// router.post('validClient', authController.validClient)

module.exports = router