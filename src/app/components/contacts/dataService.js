export default function DataService($http) {
  function getContacts() {
    return $http.get('https://randomuser.me/api/?inc=name,phone,picture,location&results=10').then(response => {
      return response.data.results;
    });
  }
  return {
    getContacts
  };
}