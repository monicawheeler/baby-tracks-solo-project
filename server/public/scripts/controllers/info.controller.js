myApp.controller('InfoController', ['$http','FamilyService', 'ChildService', function($http, FamilyService, ChildService) {
	console.log('InfoController created');
	var self = this;
	self.familyService = FamilyService;
	self.familyObject = FamilyService.familyObject;
	self.childService = ChildService;
	
	self.categoryList = ChildService.categoryList;
	self.childList = ChildService.childList;
  
	self.getChildList = function (id) {
	  const familyId = self.familyObject.id;
	  ChildService.getChildList(familyId);
	}
	
	self.getCategoryList = function() {
	  ChildService.getCategoryList();
	}

	self.getChildList();
	self.getCategoryList();

    self.updateUser = function (id, user) {
		console.log('sending to server...', user);
		$http.put(`/api/family/update/${id}`, user)
			.then(function (response) {
				console.log('success');

			},
			function (response) {
				console.log('response in updateUser', response);
				
				console.log('error');
				self.message = "Something went wrong. Please try again."
		});
	};
	
}]);
