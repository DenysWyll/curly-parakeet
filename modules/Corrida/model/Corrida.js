var mongoose = require('mongoose');

var CorridaSchema = new mongoose.Schema({
 motorista: String,
 passageiro: String,
 valorCorrida: {type: Number, default: 0},
 sexo: String
});

mongoose.model('Corrida', CorridaSchema);