const jwt = require('jsonwebtoken');
const bscryptjs = require('bcryptjs');
const conexion = require('../../connection/connection')


//Login
exports.login = async(req, res) => {
    try {
        const { usuario, contrasenia } = req.body;
        console.log(usuario);
        console.log(contrasenia);
        conexion.query('select usuario,contrasenia from usuarios where usuario=? and contrasenia=?',
        [usuario, contrasenia],
        (err,rows,fields) => {
            if(!err){

                res.send('Ingresaste!');
            // if(rows.length >0){
            //     let data = JSON.stringify(rows[0]);
            //                             // secretKey;
            //     const token = jwt.sign(data, 'KqCL7s998JrfFHRP');
            //     res.json({token});
            // }else{
            //     res.json('Usuario o clave incorrectos');
            // }
            
            }else{
            console.log(err);
            }
        }
    )
        } catch (error) {
            
        }
}




// Chech CURP usarios y contraseña

exports.checkClient = async(req, res) => {
    console.log('CHACKcLIENT Funciona');
    try {
        const { usuario, contrasenia, idrol, curp_user,idquest } = req.body;
        console.log(usuario);
        console.log(contrasenia);
        console.log(idrol);
        console.log(curp_user);
        console.log(idquest);
        // conexion.query("select curp_user from usuarios where curp_user =?", [curp_user], (err, rows) => {
            conexion.query("INSERT INTO usuarios (usuario, contrasenia, idrol, curp_user,idquest) VALUES (usuario=?, contrasenia=?, idrol=?, curp_user=?,idquest=?)",
            [usuario, contrasenia, idrol, curp_user, idquest], (err, rows) => {
            if(err) {console.log(err)};
            console.log(rows[0]);
            
            if(rows.length > 0){
                res.send('Usuario existe!');
            }

            // if(err) {console.log(err)};
            // console.log(rows[0]);
            
            // if(rows.length > 0){
            //     res.send('Usuario existe!');
            // }
            // else{
            //     conexion.query("INSERT INTO usuarios (usuario, contrasenia, idrol, idquest, idcliente) VALUES (usuario=?, contraseina=?, idrol=?, idquest=?, idclient=?)"), 
            //     [usuario, contrasenia, idrol, curp_user, idquest],
            //     (error, rows) => {
            //         if(error) console.log(error);

            //         res.send('Usuario Registrado con exito!');
            //     }
            // }  
        })  
        
    } catch (error) {
        
    }
}





// validación Clientes
exports.validClient = async (req,res)=> {
    try{
        const {email, curp, idcuenta} = req.body;

    //Encriptar contraseña 
        // let passHash = await bscryptjs.hash(contrasenia, 8)
       
        // let consulta = "INSERT INTO usuarios (usuario, contrasenia, idrol, idquest, idcliente) VALUES insert into usuarios (`usuario`, `contrasenia`, `idrol`, `idquest`, `idcliente`) values ('cliente','cliente', '3', '4', '7');" 
        // console.log(consulta);


        //conexion.query("INSERT INTO usuarios (usuario, contrasenia, idrol, idquest, idcliente) VALUES ('cliente','cliente', '3', '4', '7')", (error, res) => 
                                                                                                        //[{usuario:usuario, contraseina:passHash, idrol:idrol, idques:idques, idcliente:idcliente}]
        
                                                                                                       
         conexion.query('select email from clientes where email= ?',{email:email}, (err, rows) => {
            
            if(err){console.log(err)}

            res.send({path: rows})
            
        })

    }catch(error){
        console.log(error);
    }
    
}

