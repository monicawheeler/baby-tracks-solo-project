myApp.controller('ChildController', ['$http', 'FamilyService', 'ChildService', function ($http, FamilyService, ChildService) {
	console.log('ChildController created');
	var self = this;

	self.showAddChild = false;
	self.addChildBtn = true;
	self.showChildInfo = false;
	self.removeChildButton = false;
	self.showAddChild = ChildService.showAddChild;

	self.childService = ChildService;
	
	self.categoryList = ChildService.categoryList;

	self.familyService = FamilyService;
	self.familyObject = FamilyService.familyObject;

	self.message = ChildService.message;

	self.child = {
		first_name: '',
		dob: '',
		gender: '',
		family_id: self.familyObject.id
	};

	self.getChildList = function (familyId) {
		ChildService.getChildList(self.familyObject.id);
	}

	self.getChildList(self.familyObject.id);

	self.childList = ChildService.childList;
	console.log('childList variable in child controller', self.childList);

	self.addChild = function (child, familyId) {
		ChildService.addChild(child, self.familyObject.id);
	}

	self.deleteChild = function (id, familyId) {
		ChildService.deleteChild(id, self.familyObject.id);
	}

	self.getCategoryList = function () {
		ChildService.getCategoryList();
	}
	self.getCategoryList();
}]);
