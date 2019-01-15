export default function DataService($http) {
  function getContacts() {
    return $http.get('api/contacts').then(response => {
      return response.data;
    });
  }
  return {
    getContacts
  };
}