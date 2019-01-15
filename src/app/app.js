import angular from 'angular';
import uiRouter from 'angular-ui-router'
import '../style/app.css';

const MODULE_NAME = 'app';

const app = angular.module(MODULE_NAME, [uiRouter]);
  
app.config(($locationProvider, $urlRouterProvider, $stateProvider ) => {
    // $urlRouterProvider.other('/');

    $stateProvider
      .state('contacts', {
          url: '/',
          template: require('../contacts/index.html')
      })
      .state('another',{
        url: '/another',
        template: require('../another/index.html')
      })

      $locationProvider.html5Mode(true)
  })

export default MODULE_NAME;