const sql = require('mssql');

const config = {
  server: process.env.SQL_SERVER,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  options: {
    encrypt: process.env.SQL_ENCRYPT === 'true',
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => console.log('Database Connection Failed:', err));

module.exports = {
  sql, poolPromise
};
