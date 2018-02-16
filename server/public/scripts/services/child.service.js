myApp.service('ChildService', ['$http', '$location', function ($http, $location) {
    console.log('ChildService Loaded');
    var self = this;

    self.categoryList = {
        list: []
    };

    self.childList = {
        list: []
    };

    self.getCategoryList = function () {
        $http.get('/api/child/category')
        .then(function (response) {
            self.categoryList.list = response.data;
            console.log('self.categoryList.list', self.categoryList.list);
        })
        .catch(function (error) {
            console.log('error, response:', response);
            self.message = "Something went wrong. Please try again."
        });
    }; // end getCategoryList

    self.getChildList = function (id) {
        console.log('id in getChildList in service', id);

        $http.get(`/api/child/family/${id}`)
            .then(function (response) {
                self.childList.list = response.data;
                console.log('self.childList.list', self.childList.list);
                self.childListLength = self.childList.list.length;
            })
            .catch(function (error) {
                console.log('error, response:', response);
                self.message = "Something went wrong. Please try again."
            });
    }; // end getChildList()

    self.addChild = function (child, familyId) {
        console.log('in addChild child.service child and family id', 'child:', child, 'familyId', familyId);

        if (child.first_name === '' || child.dob === '' || child.gender === '') {
            self.message = 'Enter first name, date of birth, and gender.'
        } else {
            console.log('sending to server', child);
            $http.post('/api/child', child)
                .then(function (response) {
                    console.log('success adding child');
                    self.getChildList(familyId);
                })
                .catch(function (error) {
                    console.log('error, response:', response);
                    self.message = "Something went wrong. Please try again."
                });
        }
    }; // end addChild

    // self.updateChild = function(data, id, familyId) {
    //     const childObject = data;
    //     const childId = id;
    //     $http.put(`/api/child/update/${childId}`, childObject).then(function(response) {
    //         console.log('id', childId, 'childObject', childObject);
    //         console.log('in update child');
    //         if (response.data)
    //             console.log('child updated succesfully');
    //             // self.getChildList(familyId);
    //     }, function(response) {
    //         console.log('service does not exist');

    //     });
    // }; // end updateChild

    self.deleteChild = function (id, familyId) {
        console.log('in deleteChild child.service child and family id.', 'id:', id, 'familyId', familyId);
        const childId = id;

        $http.delete(`/api/child/${childId}`)
            .then(function (response) {
                console.log('child deleted succesfully');
                self.getChildList(familyId);
            })
            .catch(function (error) {
                console.log('error, response:', response);
                self.message = "Something went wrong. Please try again."
            });
    }; // end deleteChild

}]);