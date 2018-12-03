var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index');
  erro = 0;
  global.key = 10;
  global.atual = 0;
});

router.post('/', function(req, res, next) {
  req.getConnection(function (err, connection) {
    if (connection) {
      connection.query("SELECT * FROM adm WHERE login = ?", [req.body.login],
        function (err, rows) {
          if (rows.length != 0) {
            rows = null;
            connection.query("SELECT * FROM adm where login = ? and senha = ?",
              [req.body.login,
              req.body.senha], function (err, result) {
                if (err) {
                  console.log("Erro na senha: %s ", err);
                  res.sendStatus(404);
                }
                if (result != 0) { //se o select retornar informação acessa
                  document.cookie="chave=valor; expires=1000 * 60 * 60 * 8;";
                  global.key = Math.random();
                  //setCookie("teste", global.key, 1);
                  global.atual = global.key;
                  res.render('inicio', { title: 'Express' });

                } else { //se o select com login e senha nào funcionar, retorna a index

                  res.render('index');
                }
              }
            );
          }if (err) {
            console.log("Error no login : %s ", err);
            res.sendStatus(404);
          }
        }
      );
    }
  });
});

module.exports = router;
