// src/database.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('minha_api', 'postgres', 'kaeven1202', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Desativa logs SQL no console
});

export default sequelize;
