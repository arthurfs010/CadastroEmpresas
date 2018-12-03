var express = require('express');
var router = express.Router();

//$(document).ready(function(){
//	"use strict"
//	$(window).keydown(function(event){
//		event.preventDefault();
//		return false;
//	});
//});

/* GET users listing. */
router.get('/', function (req, res, next) {
  req.getConnection(function (err, connection) {
    if (connection) {
      connection.query('SELECT * FROM cupom', function (err, rows) {
        if (rows) {
          res.render('validaCupom', {
            fila: rows
          });
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
  });
});

router.post('/', function (req, res) {
  console.log(req.body);
  req.getConnection(function (err, connection) {
    if (connection) {
      connection.query("SELECT * from tb_espera where CPF = ? ", [req.body.cpf],
        function (err, rows) {
          console.log(err, rows, rows.length);
          if (rows.length != 0) {
            connection.query("UPDATE tb_espera SET nome = ?, telefone_fixo = ?, telefone_cel = ? WHERE cpf = ? ", [
              req.body.nome, req.body.telefone, req.body.celular, req.body.cpf
            ], function (err, result) {

              if (err) {
                console.log("Erro: %s ", err);
                res.sendStatus(404);
              }
              if (result) {
                  res.redirect('/esperaUsuario');
              }
            }
            );
          } else {
            connection.query("INSERT INTO tb_espera (cpf, nome, telefone_fixo, telefone_cel) VALUES(?,?,?,?)", [
              req.body.cpf, req.body.nome, req.body.telefone, req.body.celular
            ], function (err, result) {
              if (err) {
                console.log("Erro: %s ", err);
                res.sendStatus(404);
              }
              if (result) {
				          res.redirect('/esperaUsuario');
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
