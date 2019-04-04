const variables = {
  Api:{
    port: process.env.port || 3000
  },
  Database: {
    connection: process.env.connection || 'mongodb://localhost:27017/nofood'
  },
  Security: {
    secretKey: 'd41d8cd98f00b204e9800998ecf8427e|e86a8d5528374ad6470ca9f244dcfa22'
  }
}

module.exports = variables;