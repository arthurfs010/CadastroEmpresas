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
      connection.query('SELECT codigo, descricao, DATE_FORMAT(validade, "%d/%m/%Y") as validadeLista, validade FROM cupom where validade >= (select current_date())', function (err, rows) {
        if (rows) {
          res.render('verificaCupom', {
            cupom: rows
          }
          );
        } else {
          res.render('verificaCupom', {
            cupom: rows
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

module.exports = router;
