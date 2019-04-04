'use strict'

const repository = require('../repositories/produto-repository');
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');
const _repo = new repository();

function produtoController() {

}

produtoController.prototype.post = async (req, res) => {
  let _validationContract = new validation();

  _validationContract.isRequired(req.body.nome, 'Nomdo produto é obrigatorio');
  _validationContract.isRequired(req.body.descricao, 'Descriçaõ do produto é obrigatoria');
  _validationContract.isRequired(req.body.foto, 'Foto do produto é obrigatoria');
  _validationContract.isRequired(req.body.preco, 'Preço do produto é obrigatorio');
  if(req.body.preco)
    _validationContract.isTrue(req.body.preco == 0, 'Preço do produto tem que ser maior que 0');

  ctrlBase.post(_repo, _validationContract, req, res);
}
produtoController.prototype.put = async (req, res) => {
  let _validationContract = new validation();

  _validationContract.isRequired(req.body.nome, 'Nomdo produto é obrigatorio');
  _validationContract.isRequired(req.body.descricao, 'Descriçaõ do produto é obrigatoria');
  _validationContract.isRequired(req.body.foto, 'Foto do produto é obrigatoria');
  _validationContract.isRequired(req.body.preco, 'Preço do produto é obrigatorio');
  if(req.body.preco)
    _validationContract.isTrue(req.body.preco == 0, 'Preço do produto tem que ser maior que 0');
    
  ctrlBase.put(_repo, _validationContract, req, res);
}
produtoController.prototype.get = async (req, res) => {
  ctrlBase.get(_repo, req, res);
}
produtoController.prototype.getById = async (req, res) => {
  ctrlBase.put(_repo, req, res);
}
produtoController.prototype.delete = async (req, res) => {
  ctrlBase.put(_repo, req, res);
}

module.exports = produtoController;