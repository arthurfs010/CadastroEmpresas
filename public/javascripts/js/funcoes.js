window.setTimeout(function() {
  $(".alert-success, .alert-info").fadeTo(500, 0).slideUp(500, function(){
      $(this).remove();
  });
}, 6000);

$('.dinheiro').mask('#.00', {reverse: true});
$('.telefone').mask('(99) 9999-9999');
$('.telefonecel').mask('(99) 9 9999-9999');
$('.cnpj').mask('99.999.999/9999-99');

function funcaoEmpresas(id_empresa, nome_empresa, cnpj, endereco, responsavel, telefone_fixo, telefone_cel, email, latitude, longitude, situacao) {
	"use strict"
	$('#id_empresa').val(id_empresa)
	$('#nome_empresa').val(nome_empresa)
	$('#cnpj').val(cnpj)
	$('#endereco').val(endereco)
	$('#responsavel').val(responsavel)
	$('#telefone_fixo').val(telefone_fixo)
	$('#telefone_cel').val(telefone_cel)
	$('#email').val(email)
	$('#latitude').val(latitude)
	$('#longitude').val(longitude)
  $('#situacao').val(situacao)
}

function limpa_campos(){
   document.getElementById('id_empresa').value = "";
}

function zera_global(){
  global.key = Math.random();
}

function setCookie(cnome, cvalor, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cnome + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cnome) {
    var name = cnome + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
