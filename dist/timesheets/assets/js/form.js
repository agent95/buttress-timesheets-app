$('.digit-group').find('input').each(function() {
  $(this).attr('maxlength', 1);
  $(this).on('keyup', function(e) {
     var parent = $($(this).parent());

     if (e.keyCode === 8 || e.keyCode === 37) {
        var prev = parent.find('input#' + $(this).data('previous'));

        if (prev.length) {
           $(prev).select();
        }
     } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
        var next = parent.find('input#' + $(this).data('next'));

        if (next.length) {
           $(next).select();
        } else {
           if (parent.data('autosubmit')) {
              parent.submit();
           }
        }
     }
  });
});

function checkCode(e) {
  if ($('#digit-1').val() == '') {
     $('#digit-1').addClass('box-invalid');
     e.preventDefault();
  } else if ($('#digit-2').val() == '') {
     $('#digit-2').addClass('box-invalid');
     e.preventDefault();
  } else if ($('#digit-3').val() == '') {
     $('#digit-3').addClass('box-invalid');
     e.preventDefault();
  } else if ($('#digit-4').val() == '') {
     $('#digit-4').addClass('box-invalid');
     e.preventDefault();
  } else if ($('#digit-5').val() == '') {
     $('#digit-5').addClass('box-invalid');
     e.preventDefault();
  } else if ($('#digit-6').val() == '') {
     $('#digit-6').addClass('box-invalid');
     e.preventDefault();
  } else {
     $('#digit-1,#digit-2,#digit-3,#digit-4,#digit-5,#digit-6').addClass('box-valid');
     // $('#digit-2').addClass('box-valid');
     // $('#digit-3').addClass('box-valid');
     // $('#digit-4').addClass('box-valid');
     // $('#digit-5').addClass('box-valid');
     // $('#digit-6').addClass('box-valid');
     $('#code').val($('#digit-1').val() + $('#digit-2').val() + $('#digit-3').val() + $('#digit-4').val() + $('#digit-5').val() + $('#digit-6').val());
     if ($('#code').val().length == 6) {
        $.ajax({
              url: '{{asset("/checkcode")}}',
              type: 'POST',
              data: {
                 _token: "{{csrf_token()}}",
                 code: $('#code').val(),
                 email: '{{$_GET["email"]}}',
                 mobile: '{{$_GET["mobile"]}}'
              },
           })
           .done(function(data) {
              if (data == 1) {
                 $('#digit-1, #digit-2, #digit-3, #digit-4, #digit-5, #digit-6').removeClass('box-invalid');
                 $('#digit-1, #digit-2, #digit-3, #digit-4, #digit-5, #digit-6').addClass('box-valid');
                 $('form').submit();
              } else {
                 $('#digit-1, #digit-2, #digit-3, #digit-4, #digit-5, #digit-6').removeClass('box-valid');
                 $('#digit-1, #digit-2, #digit-3, #digit-4, #digit-5, #digit-6').addClass('box-invalid');
                 $('#digit-1, #digit-2, #digit-3, #digit-4, #digit-5, #digit-6, #code').val('');
                 e.preventDefault();
              }
           })
           .fail(function() {
              console.log("error");
           });

     } else {
        e.preventDefault();
     }

  }
}


$('#first-step-btn').on('click', function() {
  $('#forget-password').css("display", "none");
  $('#confirm-password').css("display", "none");
  $('#get-otp').css("display", "block");
}); 
$('#otp').on('click', function() {
   $('#forget-password').css("display", "none");
   $('#confirm-password').css("display", "block");
   $('#get-otp').css("display", "none");
 }); 
 
 