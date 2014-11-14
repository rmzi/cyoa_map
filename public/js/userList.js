var users;

$.get( "api/users", function( data ) {
  console.log(data);
  users = data;

  users.forEach(function(user){
	$('#users').append("<p>" + user.email + "</p>");
  })
});