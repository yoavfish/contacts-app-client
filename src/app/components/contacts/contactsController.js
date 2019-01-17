export default ($scope, _contacts, dataService) => {
  $scope.updatePagination = (data) => {
    $scope.pagination = {
      pages: Math.ceil(data.total / data.limit),
      currentPage: Math.ceil( data.offset / data.limit) 
    }
  }
  $scope.pagination = []
  $scope.contacts = _contacts.docs; 
  $scope.updatePagination(_contacts)
  $scope.sort = {
    sortType: 'name.first',
    sortDirection: 1
  }
  $scope.showAddContactRow = false;
  $scope.newContact = null;
  $scope.searchText = '';
  $scope.contactModel = {
    name: {first: null, last: null},
    location: {street: null},
    cell: null,
    picture: null,
  }

  $scope.deleteContact = (contactId) => {
    dataService.deleteContact(contactId)
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

  $scope.search = (page = 0, sortType = '', sortDirection = '') => {
    $scope.sort.sortType = sortType
    $scope.sort.sortDirection = sortDirection

    dataService.getContactsWithSearch($scope.searchText, page, $scope.sort)
    .then(
      data => {
        $scope.contacts = data.docs
        $scope.updatePagination(data)
      },
        error => {
        console.error('Error getting contacts', error)
      })
  }
}