myApp.service('ChildService', ['$http', '$location', function($http, $location){
    console.log('ChildService Loaded');
    var self = this;

    self.childList = {list: []};
    self.categoryList = {list: []};

    self.getChildList = function (id) {
        $http.get(`/api/child/family/${id}`).then(function(response) {
          console.log('ChildService -- get child');
              if(response.data) {
                  self.childList.list = response.data;
                  console.log('self.childList.list', self.childList.list);
                  self.childListLength = self.childList.list.length;
              } else {
                  console.log('ChildController -- getuser -- failure');
                  // return error
              }
          },function(response){
              console.log('ChildController -- getuser -- failure: ', response);
              // return error
          });
      }


    self.getCategoryList = function () {
        $http.get('/api/child/category').then(function(response) {
        console.log('get category');
            if(response.data) {
                self.categoryList.list = response.data;
                console.log('self.categoryList.list', self.categoryList.list);
            } else {
                console.log('get category -- failure');
                // return error
            }
        }
        ,function(response){
            console.log('get category -- failure: ', response);
            // return error
        }
        );
    }
}]);
  