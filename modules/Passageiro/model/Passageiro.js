var mongoose = require('mongoose');

var PassageiroSchema = new mongoose.Schema({
 nome: String,
 dtNasc: String,
 cpf: String,
 sexo: String
});

mongoose.model('Passageiro', PassageiroSchema);