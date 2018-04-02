myApp.service('ContactsService', ['$http', '$location', function ($http, $location) {
    console.log('ContactsService Loaded');
    var self = this;

    // Storage for contact list
    self.contactList = {
        list: []
    };

    // addContact POST request
    self.addContact = function (contact) {
        if (contact.name === '') {
            self.message = "Enter name of contact!";
        } else {
            $http.post('/api/contact', contact)
                .then(function (response) {
                    console.log('success adding contact');
                    // self.getContactList(familyId);
                    swal('The contact was sucessfully added!');
                })
                .catch(function (error) {
                    console.log('error, response:', response);
                    self.message = "Something went wrong. Please try again."
                });
        }
    }; // end addContact

}]);