myApp.service('ChildService', ['$http', '$location', function($http, $location) {
    console.log('ChildService Loaded');
    var self = this;
    
    self.categoryList = {
        list: []
    };
    
    self.childList = {
        list: []
    };

    self.getCategoryList = function() {
        $http.get('/api/child/category').then(function(response) {
            console.log('get category');
            if (response.data) {
                self.categoryList.list = response.data;
                console.log('self.categoryList.list', self.categoryList.list);
            } else {
                console.log('get category -- failure');
                // return error
            }
        }, function(response) {
            console.log('get category -- failure: ', response);
            // return error
        });
    }; // end getCategoryList

    self.addChild = function(child) {
        if (child.first_name === '' || child.dob === '' || child.gender === '') {
            self.message = 'Enter first name, date of birth, and gender.'
        } else {
            console.log('sending to server', child);
            $http.post('/api/child', child).then(function(response) {
                    console.log('success adding child');
                    self.getChildList(child.family_id);
                },
                function(response) {
                    console.log('error');
                    self.message = 'Something went wrong. Please try again.'
                })
        }
    }; // end addChild

    self.updateChild = function(data, id, familyId) {
        const childObject = data;
        const childId = id;
        $http.put(`/api/child/update/${childId}`, childObject).then(function(response) {
            console.log('id', childId, 'childObject', childObject);
            console.log('in update child');
            if (response.data)
                console.log('child updated succesfully');
            self.getChildList(familyId);
        }, function(response) {
            console.log('service does not exist');

        });
    }; // end updateChild

    self.deleteChild = function(id, familyId) {
        const childId = id;
        console.log('delete child by this id:', childId);

        $http.delete(`/api/child/${childId}`).then(function(response) {
            console.log('in delete child');
            if (response.data)
                console.log('child deleted succesfully');
            self.getChildList(familyId);
        }, function(response) {
            console.log('service does not exist');

        });
    }; // end deleteChild

    
    self.getChildList = function(id) {
        console.log('id in getChildList in service', id);

        $http.get(`/api/child/family/${id}`).then(function(response) {
            console.log('ChildService -- get child');
            if (response.data) {
                self.childList.list = response.data;
                console.log('self.childList.list', self.childList.list);
                self.childListLength = self.childList.list.length;
            } else {
                console.log('ChildController -- getuser -- failure');
                // return error
            }
        }, function(response) {
            console.log('ChildController -- getuser -- failure: ', response);
            // return error
        });
    }; // end getChildList()

}]);