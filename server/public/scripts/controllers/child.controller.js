myApp.controller('ChildController', ['$http', 'FamilyService', 'ChildService', function ($http, FamilyService, ChildService) {
	console.log('ChildController created');
	var self = this;

	self.showAddChild = false;
	self.addChildBtn = true;
	self.showChildInfo = false;
	self.removeChildButton = false;
	self.showAddChild = ChildService.showAddChild;

	self.childService = ChildService;

	self.familyService = FamilyService;
	self.familyObject = FamilyService.familyObject;

	self.message = ChildService.message;

	self.child = {
		first_name: '',
		dob: '',
		gender: '',
		family_id: self.familyObject.id
	};

	self.categoryList = ChildService.categoryList;
	self.childList = FamilyService.childList;
	self.childListLength = ChildService.childListLength;

	console.log('in child controller', self.familyObject.id);

	self.addChild = function (child, familyId) {
		ChildService.addChild(child, self.familyObject.id);
		//self.getChildList(self.familyObject.id);
	}

	self.deleteChild = function (id, familyId) {
		ChildService.deleteChild(id, self.familyObject.id);
		//self.getChildList(self.familyObject.id);
	}

	self.getChildList = function (familyId) {
		FamilyService.getChildList(self.familyObject.id);
	}

	self.getCategoryList = function () {
		ChildService.getCategoryList();
	}

	self.getChildList(self.familyObject.id);
	self.getCategoryList();

}]);
