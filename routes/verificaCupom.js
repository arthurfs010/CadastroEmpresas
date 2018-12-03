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
      connection.query('SELECT codigo, descricao, DATE_FORMAT(validade, "%d/%m/%Y") as validadeLista, validade FROM cupom where codigo = ? and validade >= (select current_date())', [req.body.cod_cup], function (err, rows) {
        if (rows) {
          res.render('verificaCupom', {
            cupom: rows,
            sucesso: req.flash('sucesso'),
            atencao: req.flash('atencao'),
            erro: req.flash('erro')
          }
          );
        } else{
          res.render('verificaCupom', {
            cupom: rows,
            sucesso: req.flash('sucesso'),
            atencao: req.flash('atencao'),
            erro: req.flash('erro')
          }
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

module.exports = router;
