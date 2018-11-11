window.setTimeout(function() {
  $(".alert-success, .alert-info").fadeTo(500, 0).slideUp(500, function(){
      $(this).remove();
  });
}, 6000);

$('.dinheiro').mask('#.00', {reverse: true});
$('.telefone').mask('(99) 9999-9999');
$('.telefonecel').mask('(99) 9 9999-9999');
