export default ($scope, _contacts, dataService) => {
  $scope.contacts = _contacts; 
  $scope.showAddContactRow = false;
  $scope.newContact = null;
  $scope.contactModel = {
    name: {first: null, last: null},
    location: {street: null},
    cell: null,
    picture: null,
  }

  $scope.deleteContact = (contactId) => {
    console.log(dataService.deleteContact(contactId))
  }
  
  $scope.saveContact = () => {

    dataService.saveContact($scope.newContact)
    .then(
      data => {
      const newContact = angular.copy(data)
      $scope.contacts.push(newContact)
      $scope.resetNewContact()
    },
      error => {
      console.error('Error saving new contact', error)
    })
  }
  
  $scope.setShowAddContactRow = (value) => {
    $scope.resetNewContact()
    $scope.showAddContactRow = value
  }

  $scope.resetNewContact = () => $scope.newContact = angular.copy($scope.contactModel)

}