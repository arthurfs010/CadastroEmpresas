var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  req.getConnection(function (err, connection) {
    if (connection) {
      connection.query('SELECT * FROM empresa ORDER BY id_empresa;', function (err, rows) {
        if (rows) {
          res.render('parametros', {
            empresas: rows
          }
          );
        }
        if (err) {
          res.render('parametros');
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
  req.getConnection(function (err, connection) {
    if (connection) {
      connection.query("SELECT * FROM parametros_empresa WHERE id_empresa = ? and tipo_veiculo = ?", [req.body.id_empresa, req.body.tipo_veiculo],
        function (err, rows) {
          if (rows.length != 0) {
            connection.query("UPDATE parametros_empresa SET valor_meiahora = ?, valor_umahora = ?, valor_diaria = ?, valor_semana = ?, valor_mes = ?, qtd_cobertas = ?, qtd_descobertas = ? WHERE id_empresa = ? and tipo_veiculo = ?",
              [
                req.body.valor_meiahora,
                req.body.valor_umahora,
                req.body.valor_diaria,
                req.body.valor_semana,
                req.body.valor_mes,
                req.body.qtd_cobertas,
                req.body.qtd_descobertas,
                req.body.id_empresa,
                req.body.tipo_veiculo
              ], function (err, result) {
                if (err) {
                  console.log("Erro update: %s ", err);
                  res.sendStatus(404);
                }
                if (result) {
                  res.redirect('/parametros');
                }
              }
            );
          } else {
            connection.query("INSERT INTO parametros_empresa(id_empresa, tipo_veiculo, valor_meiahora, valor_umahora, valor_diaria, valor_semana, valor_mes, qtd_cobertas, qtd_descobertas) VALUES (?,?,?,?,?,?,?,?,?)",
              [
                req.body.id_empresa,
                req.body.tipo_veiculo,
                req.body.valor_meiahora,
                req.body.valor_umahora,
                req.body.valor_diaria,
                req.body.valor_semana,
                req.body.valor_mes,
                req.body.qtd_cobertas,
                req.body.qtd_descobertas
              ], function (err, result) {
                if (err) {
                  console.log("Erro insert: %s ", err);
                  res.sendStatus(404);
                }
                if (result) {
                  res.redirect('/parametros');
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
