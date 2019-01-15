import angular from 'angular';
import uiRouter from 'angular-ui-router'
import ContactsController from './components/contacts/contactsController'
import dataService from './components/contacts/dataService'
import '../style/app.css';

const MODULE_NAME = 'app';

const app = angular.module(MODULE_NAME, [uiRouter]);
app.factory('dataService', dataService)
app.config(($locationProvider, $urlRouterProvider, $stateProvider ) => {
    // $urlRouterProvider.other('/');

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
      .state('another',{
        url: '/another',
        template: require('./components/another/index.html')
      })

      $locationProvider.html5Mode(true)
  })

export default MODULE_NAME;