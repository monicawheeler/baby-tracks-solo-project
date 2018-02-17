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
        $http.get(`/api/child/family/${id}`)
            .then(function (response) {
                self.childList.list = response.data;
            })
            .catch(function (error) {
                console.log('error, response:', response);
                self.message = "Something went wrong. Please try again."
            });
    }; // end getChildList()

    self.addChild = function (child, familyId) {
        $http.post('/api/child', child)
            .then(function (response) {
                console.log('success adding child');
                self.getChildList(familyId);
            })
            .catch(function (error) {
                console.log('error, response:', response);
                self.message = "Something went wrong. Please try again."
            });
    }; // end addChild

    self.deleteChild = function (id, familyId) {
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