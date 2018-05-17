myApp.controller('ContactsController', ['$http', '$location', 'FamilyService', 'ContactsService', function($http, $location, FamilyService, ContactsService) {
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

	// ContactsSerivce to get the list of children
	self.getContactList = function (familyId) {
        ContactsService.getContactList(self.familyObject.id);   
	}

	// Run the getContactList function
	self.getContactList(self.familyObject.id);

	// Get the contactList variable
	self.contactList = ContactsService.contactList;

    // Add contact
    self.addContact = function(newContact) {
        ContactsService.addContact(newContact);
    }
	// ContactsSerivce to remove a child
	self.deleteContact = function (id, familyId) {
		ContactsService.deleteContact(id, self.familyObject.id);
    }

    self.formatPhoneNumber = function(s) {
        var s2 = (""+s).replace(/\D/g, '');
        var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
        return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
      }
}]);
