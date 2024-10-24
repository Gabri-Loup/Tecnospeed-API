// src/models/ResponseLog.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

class ResponseLog extends Model {}

ResponseLog.init({
  responseTime: {
    type: DataTypes.FLOAT, // Tempo em milissegundos
    allowNull: false,
  },
  statusHttp: {
    type: DataTypes.INTEGER, // Status HTTP
    allowNull: false,
  },
  monitoramento: {
    type: DataTypes.STRING, // Coluna para monitoramento
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'ResponseLog',
});

// Sincronizar o modelo com o banco de dados (opcional)
(async () => {
  await sequelize.sync();
})();

export default ResponseLog;
