function index() {
	console.log('SLASH')
	document.querySelector('p')
	  .textContent = 'viewing index';
}

function about() {
	console.log("ABOUT!");
	document.querySelector('p')
	  .textContent = 'viewing about';
}

function contact(ctx) {
	console.log('CONTACT')
	document.querySelector('p')
	  .textContent = 'viewing contact ' + (ctx.params.contactName || '');
}

$( "#createUser" ).submit(function( event ) {
  console.log($( "#createUser" ).serializeArray());
  alert( "Handler for .submit() called." );
  event.preventDefault();
});