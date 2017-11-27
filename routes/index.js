var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Motorista = mongoose.model('Motorista');
var Passageiro = mongoose.model('Passageiro');
var Corrida = mongoose.model('Corrida');

 
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

// ROTA BUSCAR MOTORISTAS ATIVOS =====================================
router.get('/api/motoristasAtivos', function(req, res) {
    Motorista.find({ 'status' : true }, function(err, motoristas) {
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

// ROTA DELETAR MOTORISTA============================================
router.delete('/api/motoristas/:motorista_id', function(req, res) {
    // Remove o motorista no Model pelo parâmetro _id
    Motorista.remove({
        _id : req.params.motorista_id
    }, function(err, motorista) {
        if (err)
            res.send(err);
        // Busca novamente todos os motoristas após termos removido o registro
        Motorista.find(function(err, motoristas) {
            if (err)
                res.send(err)
            res.json(motoristas);
        });
    });
});
 

// ROTA EDITAR MOTORISTA =============================================
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
 


// ROTA BUSCAR PASSAGEIROS ============================================
router.get('/api/passageiros', function(req, res) {
    Passageiro.find(function(err, passageiros) {
        // Em caso de erros, envia o erro na resposta
        if (err)
            res.send(err)
        // Retorna todos os passageiros encontrados no BD
        res.json(passageiros); 
    });
});
 
// ROTA CRIAR PASSAGEIROS =============================================
router.post('/api/passageiros', function(req, res) {
    // Cria um passageiro, as informações são enviadas por uma requisição AJAX pelo Angular
    Passageiro.create({
        nome : req.body.nome,
        dtNasc : req.body.dtNasc,
        cpf : req.body.cpf,
        sexo : req.body.sexo,
        done : false
    }, function(err, passageiro) {
        if (err)
            res.send(err);
        // Busca novamente todos os passageiros após termos inserido um novo registro
        Passageiro.find(function(err, passageiros) {
            if (err)
                res.send(err)
            res.json(passageiros);
        });
    });
 
});

// ROTA DELETAR PASSAGEIRO============================================
router.delete('/api/passageiros/:passageiro_id', function(req, res) {
    // Remove o passageiro no Model pelo parâmetro _id
    Passageiro.remove({
        _id : req.params.passageiro_id
    }, function(err, passageiro) {
        if (err)
            res.send(err);
        // Busca novamente todos os passageiros após termos removido o registro
        Passageiro.find(function(err, passageiros) {
            if (err)
                res.send(err)
            res.json(passageiros);
        });
    });
});
 

// ROTA EDITAR PASSAGEIRO =============================================
router.get('/api/passageiros/:passageiro_id', function(req, res) {
    // Busca o passageiro no Model pelo parâmetro id
    Passageiro.findOne({
        _id : req.params.passageiro_id
    }, function(err, passageiro) {
        if (err)
            res.send(err);
        res.json(passageiro);
    });
});
 
// ROTA ATUALIZAR ==========================================
router.put('/api/passageiros/:passageiro_id', function(req, res) {
    // Busca o passageiro no Model pelo parâmetro id
    var passageiroData = req.body;
    var id = req.params.passageiro_id;
 
    Passageiro.update( 
        {_id: id }, 
        passageiroData, 
        { upsert: true}, 
        function(err, passageiro) {
            if (err) res.send(err);
            res.json(passageiro);
    });
    
});

// ROTA BUSCAR CORRIDAS ============================================
router.get('/api/corridas', function(req, res) {
    Corrida.find(function(err, corridas) {
        // Em caso de erros, envia o erro na resposta
        if (err)
            res.send(err)
        // Retorna todos os corridas encontrados no BD
        res.json(corridas); 
    });
});
 
// ROTA CRIAR CORRIDAS =============================================
router.post('/api/corridas', function(req, res) {
    // Cria um corrida, as informações são enviadas por uma requisição AJAX pelo Angular
    Corrida.create({
        motorista : req.body.motorista,
        passageiro : req.body.passageiro,
        valorCorrida : req.body.valorCorrida,
        done : false
    }, function(err, corrida) {
        if (err)
            res.send(err);
        // Busca novamente todos os corridas após termos inserido um novo registro
        Corrida.find(function(err, corridas) {
            if (err)
                res.send(err)
            res.json(corridas);
        });
    });
 
});

// ROTA DELETAR CORRIDA============================================
router.delete('/api/corridas/:corrida_id', function(req, res) {
    // Remove o corrida no Model pelo parâmetro _id
    Corrida.remove({
        _id : req.params.corrida_id
    }, function(err, corrida) {
        if (err)
            res.send(err);
        // Busca novamente todos os corridas após termos removido o registro
        Corrida.find(function(err, corridas) {
            if (err)
                res.send(err)
            res.json(corridas);
        });
    });
});
 

// ROTA EDITAR CORRIDA =============================================
router.get('/api/corridas/:corrida_id', function(req, res) {
    // Busca o corrida no Model pelo parâmetro id
    Corrida.findOne({
        _id : req.params.corrida_id
    }, function(err, corrida) {
        if (err)
            res.send(err);
        res.json(corrida);
    });
});
 
// ROTA ATUALIZAR CORRIDA ==========================================
router.put('/api/corridas/:corrida_id', function(req, res) {
    // Busca o corrida no Model pelo parâmetro id
    var corridaData = req.body;
    var id = req.params.corrida_id;
 
    Corrida.update( 
        {_id: id }, 
        corridaData, 
        { upsert: true}, 
        function(err, corrida) {
            if (err) res.send(err);
            res.json(corrida);
    });
    
});


// DEFININDO NOSSA ROTA PARA O ANGULARJS/FRONT-END =========
router.get('*', function(req, res) {
    // Carrega nossa view index.html que será a única da nossa aplicação
    // O Angular irá lidar com as mudanças de páginas no front-end
    res.sendfile('./modules/index.html');
});
 
module.exports = router;