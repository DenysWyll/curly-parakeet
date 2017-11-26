var mongoose = require('mongoose');
 
var MotoristaSchema = new mongoose.Schema({
  nome: String,
  dtNasc: String,
  cpf: {type: Number, default: 0},
  modeloCarro: String,
  status: {type: Boolean, default: true},
  sexo: String
});
 
mongoose.model('Motorista', MotoristaSchema);