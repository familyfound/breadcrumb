
var angular = require('angularjs');

// Angular modules (register themselves)
require('breadcrumb');

function rc(){
  var chars = 'WERTYUIOPASDFGHJKLZXCVBNM';
  return chars[parseInt(Math.random() * chars.length)];
}

function randId() {
  var id = '';
  for (var i=0; i<7; i++) {
    if (i===4) id += '-';
    id += rc();
  }
  return id;
}

function randDir() {
  return ['up', 'down'][parseInt(Math.random()*2)];
}

function randHist(){
  var num = parseInt(Math.random() * 20)
    , history = [];
  for (var i=0; i<num; i++) {
    history.push({name: 'Philomena', id: randId(), direction: randDir()});
  }
  return history;
}

function hashes() {
  var parts = location.hash.slice(1).split('&')
    , dct = {}, spl;
  for (var i=0; i<parts.length; i++) {
    spl = parts[i].split('=');
    dct[spl[0]] = spl[1];
  }
  return dct;
}

function skey(id) {
  return 'breadcrumb.' + id;
}

angular.module('test', ['breadcrumb'])
  .controller('Tester', function ($scope) {
    console.log('scope');
    // setup scope
    function getHistory() {
      var hash = hashes();
      if (hash['person']) {
        if (sessionStorage[skey(hash['person'])]) {
          return JSON.loads(sessionStorage[skey(hash['person'])]);
        }
      }
      return randHist();
    }
    function saveHistory(id, history) {
      sessionStorage[skey(id)] = JSON.stringify(history);
    }
    $scope.history = randHist();
    $scope.addHist = function () {
      $scope.history.push({name: 'Person', id: randId(), direction: randDir()});
    };
  });

