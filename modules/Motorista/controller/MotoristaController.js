// public/angularApp.js
 
// Criamos um módulo Angular chamado listaMotorista
var listaMotorista = angular.module('listaMotorista', []);

listaMotorista.controller( 'mainController', function ($scope, $http) {    

   // Quando acessar a página, carrega todos os motorista e envia para a view($scope)
   var refresh = function (){
       $http.get('/api/motoristas')
           .success(function(data) {
               $scope.motoristas = data;
               $scope.formMotorista = {};
               console.log("motorista: ", data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
   };
   refresh();

   // Quando clicar no botão Criar, envia informações para a API Node
   $scope.criarMotorista = function() {
       $http.post('/api/motoristas', $scope.formMotorista)
           .success(function(data) {
               // Limpa o formulário para criação de outros motorista
               $scope.formMotorista = {};
               $scope.motorista = data;
               refresh();
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
   };

   // Ao clicar no botão Remover, deleta o motorista
   $scope.deletarMotorista = function(id) {
       $http.delete('/api/motoristas/' + id)
           .success(function(data) {
               $scope.motorista = data;
               refresh();
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
   };

   // Ao clicar no botão Editar, edita o motorista
   $scope.editarMotorista = function(id) {
       $http.get('/api/motoristas/' + id)
           .success(function(data) {
               $scope.formMotorista = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
   };

   // Recebe o JSON do motorista para edição e atualiza
   $scope.atualizarMotorista = function() {        
       $http.put('/api/motoristas/' + $scope.formMotorista._id, $scope.formMotorista)
       .success( function(response){

           refresh();
       });
   };

});