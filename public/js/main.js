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

