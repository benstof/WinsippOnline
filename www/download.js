$(document).ready(function() {


$('.button-a').live('click', function() {


$.post('http://www.irrimaker.com/demo/demo_notify.php', function(data) {

  $('.result').html(data);
  
});

  });

 $('.highslide').live('click', function() {
 

$.post('http://www.irrimaker.com/demo/demo_notify.php', function(data) {

  $('.result').html(data);
  
});
	
  });

  




	
});








   
