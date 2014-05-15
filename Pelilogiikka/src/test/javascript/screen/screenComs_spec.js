describe('the screenComs object',function(){
	
	var rootId = 'testContainer';
	
	//Create an easily-removed container for our tests to play in
	beforeEach(function() {
	});
	
	//Clean it up after each spec
	afterEach(function() {
	});
		
	//Specs
	
	
	//private convenience method
	var appendToContainer = function(element) {
		var container = document.getElementById(rootId);
		container.appendChild(element);		
	}

});
