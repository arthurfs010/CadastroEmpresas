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
            sucesso: req.flash('sucesso'),
            atencao: req.flash('atencao'),
            erro: req.flash('erro')
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
            connection.query("UPDATE empresa SET nome_empresa = ?, situacao = ?, endereco = ?, cnpj = ?, responsavel = ?, login = ?, senha = ?, telefone_fixo = ?, telefone_cel = ?, email = ?, latitude = ?, longitude = ?, hr_seg_sex = ?, hr_seg_sex_fim = ?, hr_sabado = ?, hr_sabado_fim = ?, hr_dom_fer = ?, hr_dom_fer_fim = ? WHERE id_empresa = ?",
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
                req.body.hr_seg_sex,
                req.body.hr_seg_sex_fim,
                req.body.hr_sabado,
                req.body.hr_sabado_fim,
                req.body.hr_dom_fer,
                req.body.hr_dom_fer_fim,
                req.body.id_empresa

              ], function (err, result) {
                if (err) {
                  console.log("Erro update: %s ", err);
                  req.flash('erro', 'Verifique os dados e tente novamente, caso não funcione, entre em contato com o suporte!');
                  res.redirect('/cadastroEmpresa');
                  res.sendStatus(404);
                }
                if (result) {
                  req.flash('sucesso', 'Empresa salva com sucesso!');
                  res.redirect('/cadastroEmpresa');
                }
              }
            );
          } else {
            connection.query("SELECT * FROM empresa WHERE cnpj = ?", [req.body.cnpj],
              function (err, rows) {
                if (rows.length != 0) {
                  req.flash('atencao', 'CNPJ Existente! Verifique os cadastros...');
                  res.redirect('/cadastroEmpresa');
                } else {
                  connection.query("INSERT INTO empresa(nome_empresa, situacao, cnpj, endereco, responsavel, login, senha, telefone_fixo, telefone_cel, email, latitude, longitude, hr_seg_sex, hr_seg_sex_fim, hr_sabado, hr_sabado_fim, hr_dom_fer, hr_dom_fer_fim) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
                      req.body.hr_seg_sex,
                      req.body.hr_seg_sex_fim,
                      req.body.hr_sabado,
                      req.body.hr_sabado_fim,
                      req.body.hr_dom_fer,
                      req.body.hr_dom_fer_fim

                    ], function (err, result) {
                      if (err) {
                        console.log("Erro insert: %s ", err);
                        req.flash('erro', 'Verifique os dados e tente novamente, caso não funcione, entre em contato com o suporte!');
                        res.redirect('/cadastroEmpresa');
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
                  req.flash('erro', 'Verifique os dados e tente novamente, caso não funcione, entre em contato com o suporte!');
                  res.redirect('/cadastroEmpresa');
                  res.sendStatus(404);
                }
              }
            );
          }
          if (err) {
            console.log("Error Selecting : %s ", err);
            req.flash('erro', 'Verifique os dados e tente novamente, caso não funcione, entre em contato com o suporte!');
            res.redirect('/cadastroEmpresa');
            res.sendStatus(404);
          }
        }
      );
    }
  });
});

module.exports = router;
