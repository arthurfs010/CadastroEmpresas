window.setTimeout(function() {
  $(".alert-success, .alert-info").fadeTo(500, 0).slideUp(500, function(){
      $(this).remove();
  });
}, 6000);

$('.dinheiro').mask('#.00', {reverse: true});
$('.telefone').mask('(99) 9999-9999');
$('.telefonecel').mask('(99) 9 9999-9999');
$('.cnpj').mask('99.999.999/9999-99');

function funcaoEmpresas(id_empresa, nome_empresa, cnpj, endereco, responsavel, telefone_fixo, telefone_cel, email, latitude, longitude, situacao, hr_seg_sex, hr_seg_sex_fim, hr_sabado, hr_sabado_fim, hr_dom_fer, hr_dom_fer_fim) {
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
  $('#hr_seg_sex').val(hr_seg_sex)
  $('#hr_seg_sex_fim').val(hr_seg_sex_fim)
  $('#hr_sabado').val(hr_sabado)
  $('#hr_sabado_fim').val(hr_sabado_fim)
  $('#hr_dom_fer').val(hr_dom_fer)
  $('#hr_dom_fer_fim').val(hr_dom_fer_fim)
}

function funcaoParametros(id_empresa, tipo_veiculo, valor_meiahora, valor_umahora, valor_diaria, valor_semana, valor_mes, qtd_cobertas, qtd_descobertas) {
	"use strict"
	$('#id_empresa').val(id_empresa)
	$('#tipo_veiculo').val(tipo_veiculo)
	$('#valor_meiahora').val(valor_meiahora)
	$('#valor_umahora').val(valor_umahora)
	$('#valor_diaria').val(valor_diaria)
	$('#valor_semana').val(valor_semana)
	$('#valor_mes').val(valor_mes)
	$('#qtd_cobertas').val(qtd_cobertas)
	$('#qtd_descobertas').val(qtd_descobertas)
}

function funcaoCupons(codigo, descricao, validade) {
	"use strict"
	$('#codigo').val(codigo)
	$('#descricao').val(descricao)
	$('#validade').val(validade)

}

function limpa_campos(){
   document.getElementById('id_empresa').value = "";
}

function zera_global(){
  global.key = Math.random();
}
