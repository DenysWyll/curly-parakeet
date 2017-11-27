var mongoose = require('mongoose');

var PassageiroSchema = new mongoose.Schema({
 nome: String,
 dtNasc: String,
 cpf: {type: Number, default: 0},
 sexo: String
});

mongoose.model('Passageiro', PassageiroSchema);