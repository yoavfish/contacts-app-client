import angular from 'angular';
import uiRouter from 'angular-ui-router'
import ContactsController from './components/contacts/contactsController'
import dataService from './components/contacts/dataService'
import '../style/app.css';

const MODULE_NAME = 'app';

const app = angular.module(MODULE_NAME, [uiRouter]);
app.factory('dataService', dataService)
app.config(($locationProvider, $stateProvider ) => {

    $stateProvider
      .state('contacts', {
          url: '/',
          template: require('./components/contacts/index.html'),
          controller: ContactsController,
          resolve:{
              _contacts: function(dataService){
                return dataService.getContacts();
            }
          }
      })

      $locationProvider.html5Mode(true)
  })

export default MODULE_NAME;