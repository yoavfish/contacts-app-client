export default ($scope, _contacts, dataService) => {

  $scope.updatePagination = (data) => {
    $scope.pagination = {
      pages: Math.ceil(data.total / data.limit),
      currentPage: Math.ceil( data.offset / data.limit) 
    }
  }
  $scope.pagination = []
  $scope.updatePagination(_contacts)

  $scope.sort = {
    sortType: 'name.first',
    sortDirection: 1
  }
  $scope.contacts = _contacts.docs
  $scope.showAddContactRow = false
  $scope.newContact = null
  $scope.searchText = ''
  $scope.editContactId = null
  $scope.contactModel = {
    name: {first: null, last: null},
    location: {street: null},
    cell: null,
    picture: null,
  }
  
  $scope.setShowAddContactRow = (value) => {
    $scope.resetNewContact()
    $scope.showAddContactRow = value
  }

  $scope.setEditContactId = (contactId) => {
    $scope.editContactId = contactId
    if(!$scope.editContactId) $scope.search($scope.pagination.currentPage)
  }

  $scope.showEditRow = (contactId) => $scope.editContactId === contactId

  $scope.resetNewContact = () => $scope.newContact = angular.copy($scope.contactModel)

  $scope.saveContact = () => {
    dataService.saveContact($scope.newContact)
    .then(
      () => {
      $scope.search($scope.pagination.currentPage)
      $scope.resetNewContact()
    },
      error => console.error('Error saving new contact', error)
    )
  }
  
  $scope.deleteContact = (contactId) => {
    dataService.deleteContact(contactId)
    .then(
      () => $scope.search($scope.pagination.currentPage),
      error => console.error(`Error deleting contact (id: ${contactId})`, error)
    )
  }

  $scope.updateContact = (contact) => {
    dataService.updateContact(contact)
    .then(
      () => {
        $scope.search($scope.pagination.currentPage)
        $scope.setEditContactId(null)
      },
      error => console.error(`Error updating contact (id: ${contactId})`, error)
    )
  }

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