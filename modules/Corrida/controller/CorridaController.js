// public/angularApp.js
 
// Criamos um módulo Angular chamado listaCorrida
var listaCorrida = angular.module('listaCorrida', []);

listaCorrida.controller( 'mainController', function ($scope, $http) {    
   $scope.isAtivo = false;
   // Quando acessar a página, carrega todos os corrida e envia para a view($scope)
   var refresh = function (){
       $http.get('/api/corridas')
           .success(function(data) {
               $scope.corridas = data;
               $scope.formCorrida = {};
               console.log("corrida: ", data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });

        $http.get('/api/passageiros')
           .success(function(data) {
               $scope.passageiros = data;
               console.log("passageiro: ", data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
        });

        $http.get('/api/motoristasAtivos')
        .success(function(data) {
            $scope.motoristas = data;
            console.log("motorista: ", data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
   };
   refresh();

   // Quando clicar no botão Criar, envia informações para a API Node
   $scope.criarCorrida = function() {
       $http.post('/api/corridas', $scope.formCorrida)
           .success(function(data) {
               // Limpa o formulário para criação de outros corrida
               $scope.formCorrida = {};
               $scope.corrida = data;
               refresh();
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
   };

   // Ao clicar no botão Remover, deleta o corrida
   $scope.deletarCorrida = function(id) {
       $http.delete('/api/corridas/' + id)
           .success(function(data) {
               $scope.corrida = data;
               refresh();
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
   };

   // Ao clicar no botão Editar, edita o corrida
   $scope.editarCorrida = function(id) {
       $http.get('/api/corridas/' + id)
           .success(function(data) {
               $scope.formCorrida = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error: ' + data);
           });
   };

   // Recebe o JSON do corrida para edição e atualiza
   $scope.atualizarCorrida = function() {        
       $http.put('/api/corridas/' + $scope.formCorrida._id, $scope.formCorrida)
       .success( function(response){

           refresh();
       });
   };

});