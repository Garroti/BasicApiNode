'use strict'
const ctrlBase = require('../bin/base/controller-base');
const repository = require('../repositories/usuario-repository');
const validation = require('../bin/helpers/validation');
const _repo = new repository();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const variables = require('../bin/configurations/variables');

function usuarioController() {

}

usuarioController.prototype.post = async (req, res) => {
  let _validationContract = new validation();

  _validationContract.isRequired(req.body.nome, 'Informe seu nome');
  _validationContract.isRequired(req.body.email, 'Informe seu email');
  _validationContract.isEmail(req.body.email, 'Email é invalido');
  _validationContract.isRequired(req.body.senha, 'Senha é obrigatoria');
  _validationContract.isRequired(req.body.senhaConfirmacao, 'Confirmação de senha é obrigatoria');
  _validationContract.isTrue(req.body.senha != req.body.senhaConfirmacao, 'Senha e a confirmação são diferentes');

  let usuarioIsEmailExiste = await _repo.IsEmailExiste(req.body.email);
  if(usuarioIsEmailExiste) {
    _validationContract.isTrue(usuarioIsEmailExiste.nome != undefined, `Ja existe o email ${req.body.email} cadastrado em nossa base de dados.`);
  }

  req.body.senha = md5(req.body.senha);

  ctrlBase.post(_repo, _validationContract, req, res);
}
usuarioController.prototype.put = async (req, res) => {
  let _validationContract = new validation();

  _validationContract.isRequired(req.body.nome, 'Informe seu nome');
  _validationContract.isRequired(req.body.email, 'Informe seu email');
  _validationContract.isEmail(req.body.email, 'Email é invalido');
  _validationContract.isRequired(req.params.id, 'Informe o id do usuario a ser editado');

  let usuarioIsEmailExiste = await _repo.IsEmailExiste(req.body.email);
  if(usuarioIsEmailExiste) {
    _validationContract.isTrue(usuarioIsEmailExiste.nome != undefined && 
    (usuarioIsEmailExiste._id != req.params.id),
    `Ja existe o email ${req.body.email} cadastrado em nossa base de dados.`);
  }

  ctrlBase.put(_repo, _validationContract, req, res);

}
usuarioController.prototype.get = async (req, res) => {
  ctrlBase.get(_repo, req, res);
}
usuarioController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res);
}
usuarioController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res);
}

usuarioController.prototype.autenticar = async(req, res) => {
  let _validationContract = new validation();

  _validationContract.isRequired(req.body.email, 'Informe seu email');
  _validationContract.isEmail(req.body.email, 'Email informaod é invalido');
  _validationContract.isRequired(req.body.senha, 'Informe sua senha');

  if(!_validationContract.isValid()){
    res.status(400).send({message: 'Não foi possivel efetuar o login', validation: _validationContract.errors()});
    return
  }

  let usuarioEncontrado = await _repo.authenticate(req.body.email, req.body.senha);

  if(usuarioEncontrado){
    res.status(200).send({
      usuario: usuarioEncontrado,
      token: jwt.sign({user: usuarioEncontrado}, variables.Security.secretKey)
    });
  } else {
    res.status(404).send({message: 'Usuario e senha são invalidos'});
  }
}

module.exports = usuarioController;