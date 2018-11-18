window.setTimeout(function() {
  $(".alert-success, .alert-info").fadeTo(500, 0).slideUp(500, function(){
      $(this).remove();
  });
}, 6000);

$('.dinheiro').mask('#.00', {reverse: true});
$('.telefone').mask('(99) 9999-9999');
$('.telefonecel').mask('(99) 9 9999-9999');
$('.cnpj').mask('99.999.999/9999-99');

function funcaoEmpresas(id_empresa, nome_empresa, cnpj, endereco, responsavel, telefone_fixo, telefone_cel, email, latitude, longitude) {
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
}
