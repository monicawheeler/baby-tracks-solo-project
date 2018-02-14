myApp.controller('ChildController', ['$http', 'FamilyService', 'ChildService', function($http, FamilyService, ChildService) {
	console.log('ChildController created');
	var self = this;

	self.showAddChild = false;
	self.addChildBtn = true;

	self.childService = ChildService;

	self.familyService = FamilyService;
	self.familyObject = FamilyService.familyObject;

	self.message = '';

	self.child = {
		first_name: '',
		dob: '',
		gender: '',
		family_id: self.familyObject.id
	};

	self.categoryList = ChildService.categoryList;
	self.childList = ChildService.childList;
	self.childListLength = ChildService.childListLength;
	
	
	self.getChildList = function (familyId) {
		ChildService.getChildList(self.familyObject.id);
	}

	self.getCategoryList = function() {
		ChildService.getCategoryList();
	}

	self.addChild = function(child) {
		ChildService.addChild(child);
	}

	self.deleteChild = function(id, familyId) {
		ChildService.deleteChild(id, self.familyObject.id);
	}

	self.updateChild = function(child, id, familyId) {
		ChildService.updateChild(child, id, self.familyObject.id);
	}

	self.getChildList(self.familyObject.id);
	self.getCategoryList();

}]);
