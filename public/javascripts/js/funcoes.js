function funcaoAlunos(id, id_unidade, situacao, nome, cpf, rg, telefone_fixo, telefone_cel, sexo, endereco, numero, id_bairro, pai, mae, obs, dt_nascimento) {
	"use strict"
	$('#id').val(id)
	$('#unidade').val(id_unidade)
	$('#situacao').val(situacao)
	$('#nome').val(nome)
	$('#cpf').val(cpf)
	$('#rg').val(rg)
	$('#telefone').val(telefone_fixo)
	$('#celular').val(telefone_cel)
	if (sexo == 'M') {
		$('#class-sex-m').addClass('active')
		$('#sexom').attr('checked', true)
		$('#sexo').removeClass('active')
		$('#class-sex-f').attr('checked', false)
		// console.log(sexo);
	} else if (sexo == 'F') {
		$('#class-sex-f').addClass('active')
		$('#sexo').attr('checked', true)
		$('#class-sex-m').removeClass('active')
		$('#sexom').attr('checked', false)
	}
	$('#endereco').val(endereco)
	$('#num_endereco').val(numero)
	$('#bairro').val(id_bairro)
	$('#nome_pai').val(pai)
	$('#nome_mae').val(mae)
	$('#observacoes').val(obs)
	$('#data_nascimento').val(dt_nascimento)
	resetCheckExame()
	$.ajax({
		url:"/exame/consultaAluno",
		type:"post",
		data: {
			id:id
		},
		dataType:"JSON",
		success:function(data){
			for(var i = 0; i < data.length; i++){
				$('#mes'+data[i].mes+'').prop('checked', true);
				$('#mes'+data[i].mes+'').prop('disabled', true);
			}
		},
		error:function(data){
			console.log(data)
		}
	})
}

function funcaoPagamento(id, id_unidade, situacao, nome, cpf, rg, telefone_fixo, telefone_cel, sexo, endereco, numero, id_bairro, pai, mae, obs, dt_nascimento) {
	"use strict"
	$('#id').val(id)
	$('#unidade').val(id_unidade)
	$('#situacao').val(situacao)
	$('#nome').val(nome)
	$('#cpf').val(cpf)
	$('#rg').val(rg)
	$('#telefone').val(telefone_fixo)
	$('#celular').val(telefone_cel)
	resetCheckExame()

	$.ajax({
		url:"/mensalidade/consultaAlunoPago",
		type:"post",
		data: {
			id:id
		},
		dataType:"JSON",
		success:function(data){
			for(var i = 0; i < data.length; i++){
				$('#mes'+data[i].mes+'').prop('checked', true);
				$('#mes'+data[i].mes+'').prop('disabled', true);
			}
		},
		error:function(data){
			console.log(data)
		}
	})

}


function resetCheckExame() {
	for(var i = 0; i < 13; i++){
		$('#mes'+i+'').prop('checked', false);
		$('#mes'+i+'').prop('disabled', false);
	}
}

function excluirEspera(cpf) {
	var cpf = cpf;
	$.ajax({
		url: "/espera/",
		type: "post",
		data: {
			cpf: cpf
		},
		dataType: "text",
		success: function(data) {
			console.log("sucesso");
		},
		error: function(data) {
			console.log("erro");
		}
	})
}

function funcaoExcluirTurma(id) {
	var id = id;
	$.ajax({
		url: "/turma/deletarTurma",
		type: "post",
		data: {
			id: id
		},
		dataType: "JSON",
		success: function(data) {
			console.log("sucesso");
		},
		error: function(data) {
			console.log("erro");
		}
	})
}

function resetCheck() {
	$('#segunda').prop('checked', false)
	$('#terca').prop('checked', false)
	$('#quarta').prop('checked', false)
	$('#quinta').prop('checked', false)
	$('#sexta').prop('checked', false)
}

function funcaoAula(id, id_unidade, modalidade, inicio, fim, professor, segunda, terca, quarta, quinta, sexta) {
	"use strict"
	$('#unidade').val(id_unidade)
	$('#modalidade').val(modalidade)
	resetCheck()
	if (segunda == 'segunda') {
		$('#segunda').prop('checked', true)
	} else {
		$('#segunda').prop('checked', false)
	}
	if (terca == 'terca') {
		$('#terca').prop('checked', true)
	} else{
		$('#terca').prop('checked', false)
	}
	if (quarta == 'quarta') {
		$('#quarta').prop('checked', true)
	} else {
		$('#quarta').prop('checked', false)
	}
	if (quinta == 'quinta') {
		$('#quinta').prop('checked', true)
	} else {
		$('#quinta').prop('checked', false)
	}
	if (sexta == 'sexta') {
		$('#sexta').prop('checked', true)
	} else {
		$('#sexta').prop('checked', false)
	}
	$('#hr_inicio').val(inicio)
	$('#hr_fim').val(fim)
	$('#professor').val(professor)

}
function retornaData(){
	$(dataHoje = new Date);
	$('#data_chamada').valueOf(now.getDay() + "/" + now.getDate() + "/" + now.getMonth());
}

function funcaoColaboradores(id, id_unidade, situacao, nome, senha, senha2, telefone_fixo, telefone_cel, dt_nascimento, cpf, rg, endereco, numero, id_bairro, funcao) {
	"use strict"
	$('#unidade').val(id_unidade);
	$('#situacao').val(situacao);
	$('#nome').val(nome);
	$('#senha').val(senha);
	$('#senha2').val(senha);
	$('#telefone_fixo').val(telefone_fixo);
	$('#telefone_cel').val(telefone_cel);
	$('#data_nascimento').val(dt_nascimento);
	$('#cpf').val(cpf);
	$('#rg').val(rg);
	$('#endereco').val(endereco);
	$('#numero').val(numero);
	$('#bairro').val(id_bairro);
	$('#funcao').val(funcao);
}

function funcaoTurma(id, id_aula){
	"use strict"
	$('.checkbox').prop('checked', false);
	$('#id').val(id);
	$('#aula').val(id_aula);
	$.ajax({
		url:"/turma/consultaAlunoTurma",
		type:"post",
		data: {
			id: id
		},
		dataType:"JSON",
		success:function(data){
			for(var i = 0; i < data.length; i++){
				$('#aluno'+data[i].aluno+'').prop('checked', true);
				console.log("Passou aqui "+ data)
			}
		},
		error:function(data){
			console.log("Deu erro: "+ data)
		}
	})
}

function funcaoUnidade(id, nome, endereco, numero, id_bairro, telefone, valorMensalidade){
	"use strict"
	$('#id').val(id);
	$('#nome').val(nome);
	$('#endereco').val(endereco);
	$('#numero').val(numero);
	$('#bairro').val(id_bairro);
	$('#telefone').val(telefone);
	$('#valorMensalidade').val(valorMensalidade);
}

window.setTimeout(function() {
  $(".alert-success, .alert-info").fadeTo(500, 0).slideUp(500, function(){
      $(this).remove();
  });
}, 6000);
