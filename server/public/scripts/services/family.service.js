myApp.service('FamilyService', ['$http', '$location', 'ChildService', function ($http, $location, ChildService) {
    console.log('FamilyService Loaded');
    var self = this;
    self.familyObject = {};

    childService = ChildService;
    console.log('childService variable in the family.service.js file', childService);
    
    self.message = '';

    self.getuser = function () {
        console.log('FamilyService -- getuser');
        $http.get('/api/family')
            .then(function (response) {
                if (response.data.username) {
                    // user has a current session on the server
                    self.familyObject.id = response.data.id;
                    console.log('self.familyObject.id', self.familyObject.id);
                    
                    self.familyObject.username = response.data.username;
                    self.familyObject.family_name = response.data.family_name;
                    // console.log('FamilyService -- getuser -- User Data: ', self.familyObject.username);
                    // once logged call get children
                    childService.getChildList(self.familyObject.id);
                } else {
                    console.log('FamilyService -- getuser -- failure');
                    // user has no session, bounce them back to the login page
                    $location.path("/landing");
                }
            })
            .catch(function (error) {
                console.log('error, response:', response);
                self.message = "Something went wrong. Please try again."
            });
    }; // end getuser

    //logout user
    self.logout = function () {
        $http.get('/api/family/logout')
        .then(function (response) {
            $location.path("/landing");
        });
    } //end logout

    self.updateUser = function (id, user) {
        if (user.password === '' || user.password === undefined || !user.password) {
            self.message = "Enter a new password!";
        } else {
            $http.put(`/api/family/update/${id}`, user)
                .then(function (response) {
                    console.log('success');
                    swal('Password successfully updated.');
                })
                .catch(function (error) {
                    console.log('error, response:', response);
                    self.message = "Something went wrong. Please try again."
                });
        }
    }; // end updateUser
}]);