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
    res.render('validaCupom', {
      sucesso: req.flash('sucesso'),
      erro: req.flash('erro')
  });
});
});

router.post('/', function (req, res) {
  req.getConnection(function (err, connection) {
    if (connection) {
      connection.query("SELECT * from cupom where codigo = ? ", [req.body.cod_cup],
        function (err, rows) {
          console.log(err, rows);
          if (rows.length != 0) {
            req.flash('sucesso', 'Cupom aceito!');
            res.redirect('/validaCupom');
          } else {
            req.flash('erro', 'Cupom inválido!');
            res.redirect('/validaCupom');
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
