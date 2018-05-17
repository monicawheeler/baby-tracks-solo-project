myApp.service('ChildService', ['$http', '$location', function ($http, $location) {
    var self = this;

    // Storage for category list
    self.categoryList = {
        list: []
    };

    // Storage for child list
    self.childList = {
        list: []
    };

    // Booleans for view
    self.showAddChild = false;

    // getCategoryList GET request
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

    // getChildList GET request
    self.getChildList = function (id) {
        $http.get(`/api/child/family/${id}`)
            .then(function (response) {
                self.childList.list = response.data;
                self.childCount = self.childList.list;
            })
            .catch(function (error) {
                console.log('error, response:', response);
                self.message = "Something went wrong. Please try again."
            });
    }; // end getChildList()

    // addChild POST request
    self.addChild = function (child, familyId) {
        if (child.first_name === '' || child.dob === '' || child.gender === '') {
            self.message = "Enter first name, date of birth, and gender!";
        } else {
            $http.post('/api/child', child)
                .then(function (response) {
                    console.log('success adding child');
                    self.showAddChild = false;
                    self.getChildList(familyId);
                    swal('The child was sucessfully added!');
                })
                .catch(function (error) {
                    console.log('error, response:', response);
                    self.message = "Something went wrong. Please try again."
                });
        }
    }; // end addChild

    // deleteChild DELETE request
    self.deleteChild = function (id, familyId) {
        if(!id) {
            swal('No child selected', 'Select a child from the drop-down to stop tracking.');
        } else {
            swal({
                text: "Are you sure you want to stop tracking the child?",
                icon: "warning",
                buttons: ['Nevermind', 'Yes, stop tracking.'],
                dangerMode: true,
                closeOnClickOutside: false
            })
            .then((willDelete) => {
                if (willDelete) {
                    const childId = id;
                    $http.delete(`/api/child/${childId}`)
                        .then(function (response) {
                            swal('The child has been removed from tracking.');
                            self.getChildList(familyId);
                        })
                        .catch(function (error) {
                            console.log('error, response:', response);
                            self.message = "Something went wrong. Please try again."
                        });
                } else {
                    swal('The child will NOT be removed from tracking.');
                } // end willDelete if statement
            });
        } // end if/else for child id being present
    }; // end deleteChild
}]);