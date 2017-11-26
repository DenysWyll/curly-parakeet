var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Motorista = mongoose.model('Motorista');
 
// ROTA BUSCAR MOTORISTAS ============================================
router.get('/api/motoristas', function(req, res) {
    Motorista.find(function(err, motoristas) {
        // Em caso de erros, envia o erro na resposta
        if (err)
            res.send(err)
        // Retorna todos os motoristas encontrados no BD
        res.json(motoristas); 
    });
});
 
// ROTA CRIAR MOTORISTAS =============================================
router.post('/api/motoristas', function(req, res) {
    // Cria um motorista, as informações são enviadas por uma requisição AJAX pelo Angular
    Motorista.create({
        nome : req.body.nome,
        dtNasc : req.body.dtNasc,
        cpf : req.body.cpf,
        modeloCarro : req.body.modeloCarro,
        status : req.body.status,
        sexo : req.body.sexo,
        done : false
    }, function(err, motorista) {
        if (err)
            res.send(err);
        // Busca novamente todos os motoristas após termos inserido um novo registro
        Motorista.find(function(err, motoristas) {
            if (err)
                res.send(err)
            res.json(motoristas);
        });
    });
 
});
 

// ROTA EDITAR =============================================
router.get('/api/motoristas/:motorista_id', function(req, res) {
    // Busca o motorista no Model pelo parâmetro id
    Motorista.findOne({
        _id : req.params.motorista_id
    }, function(err, motorista) {
        if (err)
            res.send(err);
        res.json(motorista);
    });
});
 
// ROTA ATUALIZAR ==========================================
router.put('/api/motoristas/:motorista_id', function(req, res) {
    // Busca o motorista no Model pelo parâmetro id
    var motoristaData = req.body;
    var id = req.params.motorista_id;
 
    Motorista.update( 
        {_id: id }, 
        motoristaData, 
        { upsert: true}, 
        function(err, motorista) {
            if (err) res.send(err);
            res.json(motorista);
    });
    
});
 
// DEFININDO NOSSA ROTA PARA O ANGULARJS/FRONT-END =========
router.get('*', function(req, res) {
    // Carrega nossa view index.html que será a única da nossa aplicação
    // O Angular irá lidar com as mudanças de páginas no front-end
    res.sendfile('./modules/index.html');
});
 
module.exports = router;