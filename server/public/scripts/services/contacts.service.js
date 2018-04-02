myApp.service('ContactsService', ['$http', '$location', function ($http, $location) {
    console.log('ContactsService Loaded');
    var self = this;

    // Storage for contact list
    self.contactList = {
        list: []
    };

}]);