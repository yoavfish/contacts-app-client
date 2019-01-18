export default function DataService($http) {
  function getContacts() {
    return $http.get('api/contacts').then(response => {
      return response.data;
    });
  }

  function getContactsWithSearch(searchText = '', page = 0, sort = {sortType: '', sortDirection: ''}) {
    return $http.get(`api/contacts?searchText=${searchText}&page=${page}&sortType=${sort.sortType}&sortDirection=${sort.sortDirection}`).then(response => {
      return response.data;
    });
  }
  
  function deleteContact(contactId) {
    return $http.delete(`api/contacts/${contactId}`).then(response => {
      return response.data;
    });
  }
  
  function saveContact(contact) {
    return $http.post('api/contacts', contact).then(response => {
      return response.data;
    });
  }
  
  function updateContact(contact) {
    return $http.put(`api/contacts/${contact._id}`, contact).then(response => {
      return response.data;
    });
  }

  return {
    getContacts,
    getContactsWithSearch,
    deleteContact,
    saveContact,
    updateContact,
  };
}