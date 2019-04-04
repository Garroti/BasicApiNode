'use strict'

const app = require('../noFood/bin/express');
const variables = require('../noFood/bin/configurations/variables');

app.listen(variables.Api.port, () => {
  console.info(`Servidor rodando na porta ${variables.Api.port}.`);
});