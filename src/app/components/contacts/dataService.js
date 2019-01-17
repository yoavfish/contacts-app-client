export default function DataService($http) {
  function getContacts() {
    return $http.get('api/contacts').then(response => {
      return response.data;
    });
  }

  function getContactsWithSearch(searchText, page) {
    return $http.get(`api/contacts?searchText=${searchText}&page=${page}`).then(response => {
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

  return {
    getContacts,
    saveContact,
    deleteContact,
    getContactsWithSearch
  };
}