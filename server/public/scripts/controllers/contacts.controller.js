myApp.controller('ContactsController', ['$http', '$location', 'FamilyService', 'ContactsService', function($http, $location, FamilyService, ContactsService) {
    console.log('ContactsController created');
    var self = this;
    
    self.familyService = FamilyService;
    self.familyObject = FamilyService.familyObject;

    console.log('self.familyObject:', self.familyObject);
    
    self.getClass = function(pathName) {
        if($location.path() === '/emergency-contacts') {
            return 'isHidden';
        } else {
            return '';
        }
    }


	// Contact object 
	self.newContact = {
        name: '',
        type: '',
        telephone: '',
		address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        notes: '',
		family_id: self.familyObject.id
    };

    // Add contact
    self.addContact = function(newContact) {
        console.log('newContact', newContact);
        
        ContactsService.addContact(newContact);
    }
}]);