myApp.service('ContactsService', ['$http', '$location', function ($http, $location) {
    console.log('ContactsService Loaded');
    var self = this;

    // Storage for contact list
    self.contactList = {
        list: []
    };
    // getContactList GET request
    self.getContactList = function (id) {
        $http.get(`/api/contacts/family/${id}`)
            .then(function (response) {
                self.contactList.list = response.data;
            })
            .catch(function (error) {
                console.log('error, response:', response);
                self.message = "Something went wrong. Please try again."
            });
    }; // end getContactList()


    // addContact POST request
    self.addContact = function (contact) {
        const contactFamilyId = contact.family_id;

        if (contact.name === '') {
            self.message = "Enter name of contact!";
        } else {
            $http.post('/api/contacts', contact)
                .then(function (response) {
                    console.log('success adding contact');
                    
                    self.getContactList(contactFamilyId);
                    swal('The contact was sucessfully added!');
                })
                .catch(function (error) {
                    console.log('error, response:', response);
                    self.message = "Something went wrong. Please try again."
                });
        }
    }; // end addContact


    // deleteContact DELETE request
    self.deleteContact = function (id, familyId) {
            swal({
                text: "Are you sure you want to delete this emergency contact?",
                icon: "warning",
                buttons: ['Nevermind', 'Yes, delete.'],
                dangerMode: true,
                closeOnClickOutside: false
            })
            .then((willDelete) => {
                if (willDelete) {
                    const contactId = id;
                    $http.delete(`/api/contacts/${contactId}`)
                        .then(function (response) {
                            swal('The contact has been removed from tracking.');
                            self.getContactList(familyId);
                        })
                        .catch(function (error) {
                            console.log('error, response:', response);
                            self.message = "Something went wrong. Please try again."
                        });
                } else {
                    swal('This emergency contact will NOT be deleted.');
                } // end willDelete if statement
            });
    }; // end deleteContact
}]);