var mongoose = require('mongoose');
 
var MotoristaSchema = new mongoose.Schema({
  nome: String,
  dtNasc: String,
  cpf: String,
  modeloCarro: String,
  status: {type: Boolean, default: true},
  sexo: String
});
 
mongoose.model('Motorista', MotoristaSchema);