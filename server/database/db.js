import mysql from "mysql";

const conexion = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"",
    database:"face_job"
})

conexion.connect((error) =>{
    if (!error) {
        console.log('conectado uvub>');
    } else {
       throw new error 
        
    }
})

export default conexion