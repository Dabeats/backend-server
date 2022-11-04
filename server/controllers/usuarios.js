import conexion from "../database/db.js";
import sessions from "express-session";
import bcrypt from "bcrypt";

export const createUserClient = async (req, res) => {
  let { id_cliente, email, name, age, number, password } = req.body;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  conexion.query(
    "SELECT * FROM cliente WHERE id_cliente = ? OR email = ?",
    [id_cliente, email],
    (error, rows) => {
      if (rows.length > 0) {
        res.json({ data: "ya existe" });
      } else {
        conexion.query(
          "INSERT INTO cliente (id_cliente,email,name,age,number,password) VALUES(?,?,?,?,?,?)",
          [id_cliente, email, name, age, number, hash],
          (error, rows) => {
            if (rows) {
              return res.json({ data: "Insert_ok" });
            } else {
              return res.json({ data: "ERROR", error });
            }
          }
        );
      }
    }
  );
};

export const createUserProfessional = async (req, res) => {
  let { id_profesional, name, age, profesion, number, email, password } =
    req.body;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  conexion.query(
    "SELECT * FROM profesional WHERE id_profesional = ? OR email = ?",
    [id_profesional, email],
    (error, rows) => {
      if (rows.length > 0) {
        res.json({ data: "ya existe" });
      } else {
        conexion.query(
          "INSERT INTO profesional (id_profesional,name,age,profesion,number,email,password) VALUES(?,?,?,?,?,?,?)",
          [id_profesional, name, age, profesion, number, email, hash],
          (error, rows) => {
            if (rows) {
              return res.json({ data: "Insert_ok" });
            } else {
              return res.json({ data: "ERROR", error });
            }
          }
        );
      }
    }
  );
};

export const loginUserClient = async (req, res) => {
  let { email, password } = req.body;
  conexion.query(
    "SELECT * FROM cliente WHERE email = ?",
    [email],
    (error, rows) => {
      if (rows.length > 0) {
        rows.forEach((element) => {
          bcrypt.compare(password, element.password, (error, isMatch) => {
            if (!isMatch) {
              return res.json({ data: "PASSWORD_ERROR" });
            } else {
              sessions.email = rows[0].email;
              sessions.nombre = rows[0].name;
              console.log(sessions);
              return res.json({ data: "logueado" });
            }
          });
        });
      } else {
        return res.json({ data: "El usuario no existe" });
      }
    }
  );
};

export const loginUserProfession = async (req, res) => {
    let { email, password } = req.body;
    conexion.query(
      "SELECT * FROM profesional WHERE email = ?",
      [email],
      (error, rows) => {
        if (rows.length > 0) {
          rows.forEach((element) => {
            bcrypt.compare(password, element.password, (error, isMatch) => {
              if (!isMatch) {
                return res.json({ data: "PASSWORD_ERROR" });
              } else {
                sessions.email = rows[0].email;
                sessions.nombre = rows[0].name;
                console.log(sessions);
                return res.json({ data: "logueado" });
              }
            });
          });
        } else {
          return res.json({ data: "El usuario no existe" });
        }
      }
    );
};

// if (row) {
//     console.log(row.password);
//     if (bcrypt.compareSync(password, row.password)) {
//         return res.render("indexc", { name: row.name });
//     }
//     return res.render("alertL");
// }
