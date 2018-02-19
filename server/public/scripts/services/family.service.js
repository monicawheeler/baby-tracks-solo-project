myApp.service('FamilyService', ['$http', '$location', function ($http, $location) {
    console.log('FamilyService Loaded');
    var self = this;
    self.familyObject = {};

    self.childList = {
        list: []
    };

    self.message = '';

    self.getuser = function () {
        console.log('FamilyService -- getuser');
        $http.get('/api/family')
            .then(function (response) {
                if (response.data.username) {
                    // user has a current session on the server
                    self.familyObject.id = response.data.id;
                    self.familyObject.username = response.data.username;
                    self.familyObject.family_name = response.data.family_name;
                    // console.log('FamilyService -- getuser -- User Data: ', self.familyObject.username);
                    // once logged call get children
                    self.getChildList(self.familyObject.id);
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

    self.logout = function () {
        console.log('FamilyService -- logout');
        $http.get('/api/family/logout')
            .then(function (response) {
                console.log('FamilyService -- logout -- logged out');
                $location.path("/landing");
            })
            .catch(function (error) {
                console.log('error, response:', response);
                self.message = "Something went wrong. Please try again."
            });
    }; // end logout


    self.updateUser = function (id, user) {
		if (user.password === '' || user.password === undefined || !user.password) {
            self.message = "Enter a new password!";
		} else {
            console.log('sending to server...', user);
            $http.put(`/api/family/update/${id}`, user)
                .then(function (response) {
                    console.log('success');
                })
                .catch(function (error) {
                    console.log('error, response:', response);
                    self.message = "Something went wrong. Please try again."
                });
            }
    }; // end updateUser

    self.getChildList = function (id) {
        console.log('id in getChildList in service', id);

        $http.get(`/api/child/family/${id}`)
            .then(function (response) {
                self.childList.list = response.data;
                // console.log('self.childList.list', self.childList.list);
                self.childListLength = self.childList.list.length;
            })
            .catch(function (error) {
                console.log('error, response:', response);
                self.message = "Something went wrong. Please try again."
            });
    }; // end getChildList()

}]);