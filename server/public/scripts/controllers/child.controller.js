myApp.controller('ChildController', ['$http', 'FamilyService', 'ChildService', function ($http, FamilyService, ChildService) {
	var self = this;

	// booleans to toggle content in the view
	self.showAddChild = false;
	self.addChildBtn = true;
	self.removeChildButton = false;
	self.showChildInfo = false;
	self.showAddChild = ChildService.showAddChild;

	// ChildService variables
	self.childService = ChildService;
	self.categoryList = ChildService.categoryList;
	self.message = ChildService.message;

	// FamilyService variables
	self.familyService = FamilyService;
	self.familyObject = FamilyService.familyObject;

	// Child object 
	self.child = {
		first_name: '',
		dob: '',
		gender: '',
		family_id: self.familyObject.id
	};

	// ChildSerivce to get the list of children
	self.getChildList = function (familyId) {
		ChildService.getChildList(self.familyObject.id);
	}

	// Run the getChildList function
	self.getChildList(self.familyObject.id);

	// Get the childList variable
	self.childList = ChildService.childList;

	// ChildSerivce to add a child
	self.addChild = function (child, familyId) {
		ChildService.addChild(child, self.familyObject.id);
	}

	// ChildSerivce to remove a child
	self.deleteChild = function (id, familyId) {
		ChildService.deleteChild(id, self.familyObject.id);
	}

	// ChildSerivce to get the category list
	self.getCategoryList = function () {
		ChildService.getCategoryList();
	}

	// Run the getCategoryList function
	self.getCategoryList();
}]);
