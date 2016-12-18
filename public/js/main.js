$(document).ready(function(){

  $('#toggleBtn').click(function(){
    $('.toggleEl').toggle();
  });


  // Show Password in User's Show Page
  $('#check').click(function(){
    var type = $('#password').attr("type");

    if (type === "password"){
      $('#password').attr("type", "text");
    }else{
      $('#password').attr("type", "password");
    }
  });

});