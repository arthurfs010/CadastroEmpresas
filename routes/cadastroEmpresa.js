var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  /*req.getConnection(function (err, connection) {
    if (connection) {
      connection.query('SELECT * FROM tb_unidade ORDER BY nome; SELECT * FROM tb_bairro ORDER BY nome;', function (err, rows) {
        if (rows) {*/
          res.render('cadastroEmpresa'
          );/*
        }
        if (err) {
          res.render('error', {
            page_title: "Algo deu errado!",
            error: err
          });
          console.log("Error Selecting : %s ", err);
        }
      });
    }
  });*/
});

router.post('/', function (req, res) {
  req.getConnection(function (err, connection) {
    if (connection) {
      connection.query("SELECT * FROM empresa WHERE cnpj = ?", [req.body.cnpj],
        function (err, rows) {
          if (rows.length != 0) {
            connection.query("UPDATE empresa SET nome_empresa = ?, endereco = ?, responsavel = ?, login = ?, senha = ?, telefone_cel = ?, email = ?, latitude = ?, longitude = ? WHERE cnpj = ?",
              [
                req.body.nomeEmpresa,
                req.body.endereco,
                req.body.responsavel,
                req.body.login,
                req.body.senha,
                req.body.telefone,
                req.body.email,
                req.body.latitude,
                req.body.longitude,
                req.body.cnpj

              ], function (err, result) {
                if (err) {
                  console.log("Erro update: %s ", err);
                  res.sendStatus(404);
                }
                if (result) {
                  res.redirect('/cadastroEmpresa');
                }
              }
            );
          } else {
            connection.query("INSERT INTO empresa(nome_empresa, cnpj, endereco, responsavel, login, senha, telefone_cel, email, latitude, longitude) VALUES (?,?,?,?,?,?,?,?,?,?)",
              [
                req.body.nomeEmpresa,
                req.body.cnpj,
                req.body.endereco,
                req.body.responsavel,
                req.body.login,
                req.body.senha,
                req.body.telefone,
                req.body.email,
                req.body.latitude,
                req.body.longitude,

              ], function (err, result) {
                if (err) {
                  console.log("Erro insert: %s ", err);
                  res.sendStatus(404);
                }
                if (result) {
                  res.redirect('/cadastroEmpresa');
                }
              }
            );
          }
          if (err) {
            console.log("Error Selecting : %s ", err);
            res.sendStatus(404);
          }
        }
      );
    }
  });
});

module.exports = router;
