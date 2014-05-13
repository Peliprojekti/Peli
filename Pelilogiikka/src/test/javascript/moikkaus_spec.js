describe('the Moikkaus object',function(){
	
	var rootId = 'testContainer';
	
	//Create an easily-removed container for our tests to play in
	beforeEach(function() {
	});
	
	//Clean it up after each spec
	afterEach(function() {
	});
		
	//Specs
	
	describe('greeting',function() {	
		
		it('greets',function() {
			
			expect(moikkaa()).toBe("Moi maailma.");
		});
		
	});
	
	//private convenience method
	var appendToContainer = function(element) {
		var container = document.getElementById(rootId);
		container.appendChild(element);		
	}

});
