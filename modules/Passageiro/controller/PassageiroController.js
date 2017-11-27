// public/angularApp.js
 
// Criamos um módulo Angular chamado listaPassageiro
var listaPassageiro = angular.module('listaPassageiro', []);

listaPassageiro.controller( 'mainController', function ($scope, $http) {    

   // Quando acessar a página, carrega todos os passageiro e envia para a view($scope)
   var refresh = function (){
       $http.get('/api/passageiros')
           .success(function(data) {
               $scope.passageiros = data;
               $scope.formPassageiro = {};
               console.log("passageiro: ", data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
        });
   };
   refresh();

   // Quando clicar no botão Criar, envia informações para a API Node
   $scope.criarPassageiro = function() {
       $http.post('/api/passageiros', $scope.formPassageiro)
           .success(function(data) {
               // Limpa o formulário para criação de outros passageiro
               $scope.formPassageiro = {};
               $scope.passageiro = data;
               refresh();
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
   };

   // Ao clicar no botão Remover, deleta o passageiro
   $scope.deletarPassageiro = function(id) {
       $http.delete('/api/passageiros/' + id)
           .success(function(data) {
               $scope.passageiro = data;
               refresh();
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
   };

   // Ao clicar no botão Editar, edita o passageiro
   $scope.editarPassageiro = function(id) {
       $http.get('/api/passageiros/' + id)
           .success(function(data) {
               $scope.formPassageiro = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
   };

   // Recebe o JSON do passageiro para edição e atualiza
   $scope.atualizarPassageiro = function() {        
       $http.put('/api/passageiros/' + $scope.formPassageiro._id, $scope.formPassageiro)
       .success( function(response){

           refresh();
       });
   };

});