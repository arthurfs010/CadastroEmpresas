var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  if(global.key == global.atual /*&& getCookie(teste") == global.key*/){
  req.getConnection(function (err, connection) {
    if (connection) {
      connection.query('SELECT UPPER(codigo) as codigo, descricao, DATE_FORMAT(validade, "%d/%m/%Y") as validadeLista, validade FROM cupom', function (err, rows) {
        if (rows) {
          res.render('cupom', {
            cupons: rows,
            sucesso: req.flash('sucesso')
          }
          );
        }
        if (err) {
          res.render('cupom', {
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
      connection.query("SELECT * FROM cupom WHERE codigo = ?", [req.body.codigo],
        function (err, rows) {
          if (rows.length != 0) {
            connection.query("SELECT * FROM cupom WHERE validade >= (select current_date())",
              function (err, rows) {
                if (rows.length != 0) {
                  connection.query("SELECT * FROM cupom WHERE ? >= (select current_date()) && codigo <> ?", [req.body.validade, req.body.codigo],
                    function (err, rows) {
                      if (rows.length != 0) {
                          connection.query("UPDATE cupom SET validade = (DATE_SUB(CURRENT_DATE, INTERVAL 1 DAY)) WHERE validade >= (select current_date()); UPDATE cupom SET descricao = ?, validade = ? WHERE codigo = ?",
                            [
                              req.body.descricao,
                              req.body.validade,
                              req.body.codigo
                            ], function (err, result) {
                              if (err) {
                                console.log("Erro update: %s ", err);
                                res.sendStatus(404);
                              }
                              if (result) {
                                req.flash('sucesso', 'Cupom salvo com sucesso!');
                                res.redirect('/cupom');
                              }
                            }
                          );
                      } else {
                        connection.query("UPDATE cupom SET descricao = ?, validade = ? WHERE codigo = ?",
                          [
                            req.body.descricao,
                            req.body.validade,
                            req.body.codigo
                          ], function (err, result) {
                            if (err) {
                              console.log("Erro update: %s ", err);
                              res.sendStatus(404);
                            }
                            if (result) {
                              req.flash('sucesso', 'Cupom salvo com sucesso!');
                              res.redirect('/cupom');
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
                } else {
                  connection.query("UPDATE cupom SET descricao = ?, validade = ? WHERE codigo = ?",
                    [
                      req.body.descricao,
                      req.body.validade,
                      req.body.codigo
                    ], function (err, result) {
                      if (err) {
                        console.log("Erro update: %s ", err);
                        res.sendStatus(404);
                      }
                      if (result) {
                        req.flash('sucesso', 'Cupom salvo com sucesso!');
                        res.redirect('/cupom');
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

          } else {
            connection.query("SELECT * FROM cupom WHERE ? >= (select current_date())", [req.body.validade],
              function (err, rows) {
                if (rows.length != 0) {
                  connection.query("UPDATE cupom SET validade = (DATE_SUB(CURRENT_DATE, INTERVAL 1 DAY)) WHERE validade >= (select current_date())",
                    function (err, result) {
                      if (result) {
                          connection.query("INSERT INTO cupom(codigo, descricao, validade) VALUES (?,?,?)",
                          [
                            req.body.codigo,
                            req.body.descricao,
                            req.body.validade
                          ], function (err, result) {
                            if (err) {
                              console.log("Erro insert: %s ", err);
                              res.sendStatus(404);
                            }
                            if (result) {
                              req.flash('sucesso', 'Cupom salvo com sucesso!');
                              res.redirect('/cupom');
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
                } else {
                  connection.query("INSERT INTO cupom(codigo, descricao, validade) VALUES (?,?,?)",
                  [
                    req.body.codigo,
                    req.body.descricao,
                    req.body.validade
                  ], function (err, result) {
                    if (err) {
                      console.log("Erro insert: %s ", err);
                      res.sendStatus(404);
                    }
                    if (result) {
                      req.flash('sucesso', 'Cupom salvo com sucesso!');
                      res.redirect('/cupom');
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
