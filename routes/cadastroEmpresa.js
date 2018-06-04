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
  /*req.getConnection(function (err, connection) {
    if (connection) {
      connection.query("SELECT * FROM tb_unidade WHERE nome = ?", [req.body.nome],
        function (err, rows) {
          if (rows.length != 0) {
            connection.query("UPDATE tb_unidade SET nome = ?, telefone = ?, endereco = ?, numero = ?, id_bairro = ?, valorMensalidade = ? WHERE nome = ?",
              [
                req.body.nome,
                req.body.telefone,
                req.body.endereco,
                req.body.numero,
                req.body.bairro,
                req.body.valorMensalidade,
                req.body.nome
              ], function (err, result) {
                if (err) {
                  console.log("Erro: %s ", err);
                  res.sendStatus(404);
                }
                if (result) {
                  res.redirect('/unidade');
                }
              }
            );
          } else {
            connection.query("INSERT INTO tb_unidade(nome, telefone, endereco, numero, id_bairro, valorMensalidade) VALUES (?,?,?,?,?,?)",
              [
                req.body.nome,
                req.body.telefone,
                req.body.endereco,
                req.body.numero,
                req.body.bairro,
                req.body.valorMensalidade
              ], function (err, result) {
                if (err) {
                  console.log("Erro: %s ", err);
                  res.sendStatus(404);
                }
                if (result) {
                  res.redirect('/unidade');
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
  });*/
});

module.exports = router;
