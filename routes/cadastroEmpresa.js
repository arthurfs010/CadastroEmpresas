var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  if(global.key == global.atual /*&& getCookie(teste") == global.key*/){
  req.getConnection(function (err, connection) {
    if (connection) {
      connection.query('SELECT * FROM empresa order by id_empresa;', function (err, rows) {
        if (rows) {
          res.render('cadastroEmpresa', {
            empresas: rows,
            sucesso: req.flash('sucesso')
          }
          );
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
}  else {
  res.redirect('/');
}
});

router.post('/', function (req, res) {
  req.getConnection(function (err, connection) {
    if (connection) {
      connection.query("SELECT * FROM empresa WHERE id_empresa = ?", [req.body.id_empresa],
        function (err, rows) {
          if (rows.length != 0) {
            connection.query("UPDATE empresa SET nome_empresa = ?, situacao = ?, endereco = ?, cnpj = ?, responsavel = ?, login = ?, senha = ?, telefone_fixo = ?, telefone_cel = ?, email = ?, latitude = ?, longitude = ? WHERE id_empresa = ?",
              [
                req.body.nome_empresa,
                req.body.situacao,
                req.body.endereco,
                req.body.cnpj,
                req.body.responsavel,
                "null",
                "null",
                req.body.telefone_fixo,
                req.body.telefone_cel,
                req.body.email,
                req.body.latitude,
                req.body.longitude,
                req.body.id_empresa

              ], function (err, result) {
                if (err) {
                  console.log("Erro update: %s ", err);
                  res.sendStatus(404);
                }
                if (result) {
                  req.flash('sucesso', 'Empresa salva com sucesso!');
                  res.redirect('/cadastroEmpresa');
                }
              }
            );
          } else {
            connection.query("INSERT INTO empresa(nome_empresa, situacao, cnpj, endereco, responsavel, login, senha, telefone_fixo, telefone_cel, email, latitude, longitude) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
              [
                req.body.nome_empresa,
                req.body.situacao,
                req.body.cnpj,
                req.body.endereco,
                req.body.responsavel,
                "null",
                "null",
                req.body.telefone_fixo,
                req.body.telefone_cel,
                req.body.email,
                req.body.latitude,
                req.body.longitude,

              ], function (err, result) {
                if (err) {
                  console.log("Erro insert: %s ", err);
                  res.sendStatus(404);
                }
                if (result) {
                  req.flash('sucesso', 'Empresa salva com sucesso!');
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
