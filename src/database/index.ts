import pgPromise, { IMain } from 'pg-promise';
import mysql from "mysql"


const connection = mysql.createConnection({

  host: process.env.DATABASE_HOST, // Host do PostgreSQL
  port: process.env.DATABASE_PORT as unknown as number, // Porta do PostgreSQL
  database: process.env.DATABASE_SCHEMA, // Nome do seu banco de dados
  user: process.env.DATABASE_USER, // Nome de usuário do PostgreSQL
  password: process.env.DATABASE_PASSWORD, // Senha do PostgreSQL

})

export default connection
const pgp: IMain = pgPromise({});
const db = pgp({
  host: process.env.DATABASE_HOST, // Host do PostgreSQL
  port: process.env.DATABASE_PORT as unknown as number, // Porta do PostgreSQL
  database: process.env.DATABASE_SCHEMA, // Nome do seu banco de dados
  user: process.env.DATABASE_USER, // Nome de usuário do PostgreSQL
  password: process.env.DATABASE_PASSWORD, // Senha do PostgreSQL
});


export { db };